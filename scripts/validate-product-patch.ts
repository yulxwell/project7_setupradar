import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { KEYBOARD_DATABASE } from "../src/content/kr/products/keyboards";
import { MOUSE_DATABASE } from "../src/content/kr/products/mice";

type ProductCategory = "mouse" | "keyboard";

type PatchProduct = {
  id?: unknown;
  slug?: unknown;
  category?: unknown;
  status?: unknown;
  brand?: unknown;
  name?: unknown;
  basicFilters?: unknown;
  advancedFilters?: unknown;
  detailSpecs?: unknown;
  rawSpecs?: unknown;
  copy?: unknown;
  shellReferences?: unknown;
  productImages?: unknown;
  productLinks?: unknown;
  sources?: unknown;
};

type ProductPatch = {
  projectId?: unknown;
  type?: unknown;
  locale?: unknown;
  updatedAt?: unknown;
  products?: unknown;
};

type ExistingProduct = {
  id: string;
  slug?: string;
  category: ProductCategory;
  brand?: string;
  name: string;
  status: string;
  basicFilters?: Record<string, unknown>;
  detailSpecs?: Record<string, unknown>;
  rawSpecs?: Record<string, unknown>;
};

type ProductDecision = {
  patchLabel: string;
  category: ProductCategory;
  duplicateReasons: string[];
  matchedExisting?: ExistingProduct;
  autoMergeCandidates: string[];
  manualReviewFields: string[];
  holdFields: string[];
};

type ValidationSummary = {
  errors: string[];
  warnings: string[];
  newCandidates: ProductDecision[];
  duplicateCandidates: ProductDecision[];
  blockedFields: string[];
};

const PROJECT_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const STATUS_VALUES = ["draft", "review", "published", "archived"] as const;
const PRODUCT_CATEGORIES = ["mouse", "keyboard"] as const;
const MOUSE_BASIC_FILTER_VALUES = {
  shape: ["symmetrical", "right_ergonomic", "vertical", "any"],
  weight: ["ultralight", "light", "medium", "any"],
  connection: ["wired", "wireless", "multi_mode", "any"],
  size: ["small", "medium", "large", "unknown"],
  price: ["budget", "mid", "premium", "any"],
} as const;
const KEYBOARD_BASIC_FILTER_VALUES = {
  layout: ["full", "tkl", "compact", "any"],
  connection: ["wired", "wireless", "multi_mode", "any"],
  feel: ["smooth_linear", "tactile", "clicky", "quiet", "unknown"],
  noise: ["quiet_preferred", "no_preference"],
  price: ["budget", "mid", "premium", "any"],
} as const;
const SHELL_RELATION_VALUES = ["similar_shape", "community_compared", "inspired_by", "unknown"] as const;
const SHELL_CONFIDENCE_VALUES = ["low", "medium", "high"] as const;
const SHELL_SOURCE_VALUES = ["eloshapes", "community", "official", "manual", "unknown"] as const;
const BANNED_TERMS = [
  "카피쉘",
  "배꼈",
  "짭",
  "표절",
  "원본 쉘",
  "동일 쉘",
  "완전히 같다",
  "최고",
  "완벽",
  "무조건",
  "끝판왕",
  "압도적",
  "정밀 진단",
  "불량 확정",
  "정상 확정",
] as const;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function hasAllowedValue<T extends readonly string[]>(value: unknown, allowedValues: T): value is T[number] {
  return typeof value === "string" && allowedValues.includes(value);
}

function normalizeText(value: unknown) {
  if (!isNonEmptyString(value)) return "";
  return value
    .toLowerCase()
    .replace(/로지텍/g, "logitech")
    .replace(/독거미/g, "")
    .replace(/dragonfly/g, "")
    .replace(/[^a-z0-9가-힣]/g, "");
}

function stringifyLabel(product: PatchProduct) {
  const brand = isNonEmptyString(product.brand) ? product.brand : "";
  const name = isNonEmptyString(product.name) ? product.name : "";
  const slug = isNonEmptyString(product.slug) ? product.slug : "";
  const id = isNonEmptyString(product.id) ? product.id : "";
  return [brand, name].filter(Boolean).join(" ") || slug || id || "unknown product";
}

function createSummary(): ValidationSummary {
  return {
    errors: [],
    warnings: [],
    newCandidates: [],
    duplicateCandidates: [],
    blockedFields: [],
  };
}

function collectBannedTerms(value: unknown, pathLabel: string, summary: ValidationSummary) {
  if (typeof value === "string") {
    for (const term of BANNED_TERMS) {
      if (value.includes(term)) {
        summary.errors.push(`${pathLabel}: 금지 표현 "${term}"이 포함되어 있습니다.`);
      }
    }
    return;
  }

  if (Array.isArray(value)) {
    value.forEach((item, index) => collectBannedTerms(item, `${pathLabel}[${index}]`, summary));
    return;
  }

  if (isRecord(value)) {
    for (const [key, nestedValue] of Object.entries(value)) {
      collectBannedTerms(nestedValue, `${pathLabel}.${key}`, summary);
    }
  }
}

function validateNoDuplicates(products: PatchProduct[], field: "id" | "slug", summary: ValidationSummary) {
  const seen = new Map<string, string>();
  for (const product of products) {
    const value = product[field];
    if (!isNonEmptyString(value)) continue;

    const previous = seen.get(value);
    if (previous) {
      summary.errors.push(`patch 내부 ${field} 중복: "${value}" (${previous}, ${stringifyLabel(product)})`);
      continue;
    }
    seen.set(value, stringifyLabel(product));
  }
}

function validateBasicFilters(
  product: PatchProduct,
  category: ProductCategory,
  label: string,
  summary: ValidationSummary,
) {
  if (!isRecord(product.basicFilters)) {
    summary.errors.push(`${label}: basicFilters가 필요합니다.`);
    return;
  }

  const rules = category === "mouse" ? MOUSE_BASIC_FILTER_VALUES : KEYBOARD_BASIC_FILTER_VALUES;
  for (const [key, allowedValues] of Object.entries(rules)) {
    const value = product.basicFilters[key];
    if (!hasAllowedValue(value, allowedValues)) {
      summary.errors.push(`${label}: basicFilters.${key} 값은 ${allowedValues.join(", ")} 중 하나여야 합니다.`);
    }
  }
}

function validateShellReferences(product: PatchProduct, label: string, summary: ValidationSummary) {
  if (product.shellReferences === undefined) return;
  if (!Array.isArray(product.shellReferences)) {
    summary.errors.push(`${label}: shellReferences는 배열이어야 합니다.`);
    return;
  }

  for (const [index, reference] of product.shellReferences.entries()) {
    const referenceLabel = `${label}.shellReferences[${index}]`;
    if (!isRecord(reference)) {
      summary.errors.push(`${referenceLabel}: 객체 형식이어야 합니다.`);
      continue;
    }
    if (!hasAllowedValue(reference.relationType, SHELL_RELATION_VALUES)) {
      summary.errors.push(`${referenceLabel}: relationType 값이 허용 범위를 벗어났습니다.`);
    }
    if (!hasAllowedValue(reference.confidence, SHELL_CONFIDENCE_VALUES)) {
      summary.errors.push(`${referenceLabel}: confidence 값이 허용 범위를 벗어났습니다.`);
    }
    if (!hasAllowedValue(reference.sourceHint, SHELL_SOURCE_VALUES)) {
      summary.errors.push(`${referenceLabel}: sourceHint 값이 허용 범위를 벗어났습니다.`);
    }
    if (!isNonEmptyString(reference.editorNoteKo)) {
      summary.warnings.push(`${referenceLabel}: editorNoteKo가 없어 공개 후보가 아닙니다.`);
    }
  }
}

function existingProducts(): ExistingProduct[] {
  return [...MOUSE_DATABASE, ...KEYBOARD_DATABASE].map((product) => ({
    id: product.id,
    slug: product.slug,
    category: product.category,
    brand: product.brand,
    name: product.name,
    status: product.status,
    basicFilters: product.basicFilters as Record<string, unknown> | undefined,
    detailSpecs: product.detailSpecs as Record<string, unknown> | undefined,
    rawSpecs: product.rawSpecs as Record<string, unknown> | undefined,
  }));
}

function findDuplicate(product: PatchProduct, products: ExistingProduct[]) {
  const patchId = isNonEmptyString(product.id) ? product.id : "";
  const patchSlug = isNonEmptyString(product.slug) ? product.slug : "";
  const patchName = normalizeText(`${isNonEmptyString(product.brand) ? product.brand : ""} ${isNonEmptyString(product.name) ? product.name : ""}`);

  for (const existing of products) {
    const reasons: string[] = [];
    if (patchId && existing.id === patchId) reasons.push("id 동일");
    if (patchSlug && existing.slug === patchSlug) reasons.push("slug 동일");

    const existingName = normalizeText(`${existing.brand ?? ""} ${existing.name}`);
    if (patchName && existingName && (patchName === existingName || patchName.includes(existingName) || existingName.includes(patchName))) {
      reasons.push("brand + name 유사");
    }

    if (reasons.length > 0) {
      return { existing, reasons };
    }
  }

  return undefined;
}

function hasMeaningfulValue(value: unknown): boolean {
  if (value === null || value === undefined) return false;
  if (typeof value === "string") return value.trim().length > 0;
  if (Array.isArray(value)) return value.length > 0;
  if (isRecord(value)) return Object.values(value).some(hasMeaningfulValue);
  return true;
}

function objectKeysWithValues(value: unknown) {
  if (!isRecord(value)) return [];
  return Object.entries(value)
    .filter(([, entry]) => hasMeaningfulValue(entry))
    .map(([key]) => key);
}

function classifyDuplicate(product: PatchProduct, existing: ExistingProduct) {
  const autoMergeCandidates: string[] = [];
  const manualReviewFields: string[] = [];
  const holdFields: string[] = [];

  if (isRecord(product.detailSpecs)) {
    for (const key of objectKeysWithValues(product.detailSpecs)) {
      const existingValue = existing.detailSpecs?.[key];
      if (!hasMeaningfulValue(existingValue)) {
        autoMergeCandidates.push(`detailSpecs.${key}`);
      } else {
        manualReviewFields.push(`detailSpecs.${key} 기존 값 충돌 가능`);
      }
    }
  }

  if (isRecord(product.basicFilters)) {
    for (const key of objectKeysWithValues(product.basicFilters)) {
      const existingValue = existing.basicFilters?.[key];
      const patchValue = product.basicFilters[key];
      if (existingValue !== patchValue) {
        manualReviewFields.push(`basicFilters.${key} Finder 영향 검토 필요`);
      }
    }
  }

  if (isRecord(product.rawSpecs) && hasMeaningfulValue(product.rawSpecs.note)) {
    manualReviewFields.push("rawSpecs.note 추가 확인 메모 후보");
  }

  if (isRecord(product.copy)) {
    for (const key of objectKeysWithValues(product.copy)) {
      manualReviewFields.push(`copy.${key} 별도 문구 QA 후보`);
    }
  }

  if (Array.isArray(product.shellReferences) && product.shellReferences.length > 0) {
    holdFields.push("shellReferences 자동 병합 금지");
  }
  if (Array.isArray(product.productImages) && product.productImages.length > 0) {
    holdFields.push("productImages 자동 병합 금지");
  }
  if (Array.isArray(product.productLinks) && product.productLinks.length > 0) {
    holdFields.push("productLinks 자동 병합 금지");
  }
  if (product.sources !== undefined) {
    holdFields.push("sources 최상위 필드 추가 금지");
  }
  if (product.status !== undefined && product.status !== existing.status) {
    holdFields.push("status 자동 변경 금지");
  }

  return { autoMergeCandidates, manualReviewFields, holdFields };
}

function validateProduct(product: PatchProduct, index: number, summary: ValidationSummary, existing: ExistingProduct[]) {
  const label = `products[${index}] ${stringifyLabel(product)}`;
  const initialErrorCount = summary.errors.length;

  collectBannedTerms(product, `products[${index}]`, summary);

  if (!isNonEmptyString(product.id)) summary.errors.push(`${label}: id가 필요합니다.`);
  if (!isNonEmptyString(product.slug)) summary.errors.push(`${label}: slug가 필요합니다.`);
  if (!isNonEmptyString(product.brand)) summary.errors.push(`${label}: brand가 필요합니다.`);
  if (!isNonEmptyString(product.name)) summary.errors.push(`${label}: name이 필요합니다.`);
  if (!hasAllowedValue(product.category, PRODUCT_CATEGORIES)) {
    summary.errors.push(`${label}: category는 mouse 또는 keyboard여야 합니다.`);
    return;
  }
  if (!hasAllowedValue(product.status, STATUS_VALUES)) {
    summary.errors.push(`${label}: status는 ${STATUS_VALUES.join(", ")} 중 하나여야 합니다.`);
  }

  validateBasicFilters(product, product.category, label, summary);
  if (product.category === "mouse") {
    validateShellReferences(product, label, summary);
  } else if (product.shellReferences !== undefined) {
    summary.warnings.push(`${label}: 키보드 제품의 shellReferences는 현재 사용하지 않습니다.`);
  }

  if (summary.errors.length > initialErrorCount) {
    return;
  }

  const duplicate = findDuplicate(product, existing);
  if (!duplicate) {
    summary.newCandidates.push({
      patchLabel: stringifyLabel(product),
      category: product.category,
      duplicateReasons: [],
      autoMergeCandidates: [],
      manualReviewFields: [],
      holdFields: [],
    });
    return;
  }

  const classified = classifyDuplicate(product, duplicate.existing);
  summary.blockedFields.push(...classified.holdFields.map((field) => `${stringifyLabel(product)}: ${field}`));
  summary.duplicateCandidates.push({
    patchLabel: stringifyLabel(product),
    category: product.category,
    duplicateReasons: duplicate.reasons,
    matchedExisting: duplicate.existing,
    ...classified,
  });
}

function validatePatchEnvelope(patch: unknown, summary: ValidationSummary): PatchProduct[] {
  if (!isRecord(patch)) {
    summary.errors.push("patch root는 객체여야 합니다.");
    return [];
  }

  const productPatch = patch as ProductPatch;
  if (productPatch.projectId !== "project7_setupradar") {
    summary.errors.push("projectId는 project7_setupradar여야 합니다.");
  }
  if (productPatch.type !== "product_config_patch") {
    summary.errors.push("type은 product_config_patch여야 합니다.");
  }
  if (productPatch.locale !== "kr") {
    summary.errors.push("locale은 kr이어야 합니다.");
  }
  if (!isNonEmptyString(productPatch.updatedAt)) {
    summary.warnings.push("updatedAt이 비어 있습니다.");
  }
  if (!Array.isArray(productPatch.products)) {
    summary.errors.push("products는 배열이어야 합니다.");
    return [];
  }

  const products = productPatch.products.filter(isRecord) as PatchProduct[];
  if (products.length !== productPatch.products.length) {
    summary.errors.push("products의 모든 항목은 객체여야 합니다.");
  }

  validateNoDuplicates(products, "id", summary);
  validateNoDuplicates(products, "slug", summary);

  return products;
}

function printDecision(decision: ProductDecision) {
  const matched = decision.matchedExisting
    ? ` -> 기존: ${decision.matchedExisting.brand ?? ""} ${decision.matchedExisting.name} (${decision.matchedExisting.slug ?? decision.matchedExisting.id})`
    : "";
  console.log(`- ${decision.patchLabel} [${decision.category}]${matched}`);
  if (decision.duplicateReasons.length > 0) console.log(`  중복 사유: ${decision.duplicateReasons.join(", ")}`);
  if (decision.autoMergeCandidates.length > 0) console.log(`  자동 보강 후보: ${decision.autoMergeCandidates.join(", ")}`);
  if (decision.manualReviewFields.length > 0) console.log(`  수동 검토 필요: ${decision.manualReviewFields.join(", ")}`);
  if (decision.holdFields.length > 0) console.log(`  반영 보류: ${decision.holdFields.join(", ")}`);
}

function printSummary(summary: ValidationSummary) {
  console.log("\n제품 patch dry-run 요약");
  console.log(`- 신규 추가 후보: ${summary.newCandidates.length}`);
  console.log(`- 기존 중복 후보: ${summary.duplicateCandidates.length}`);
  console.log(`- 자동 보강 후보 필드: ${summary.duplicateCandidates.reduce((count, item) => count + item.autoMergeCandidates.length, 0)}`);
  console.log(`- 수동 검토 필요 필드: ${summary.duplicateCandidates.reduce((count, item) => count + item.manualReviewFields.length, 0)}`);
  console.log(`- 반영 보류 필드: ${summary.blockedFields.length}`);
  console.log(`- warnings: ${summary.warnings.length}`);
  console.log(`- errors: ${summary.errors.length}`);

  if (summary.newCandidates.length > 0) {
    console.log("\n신규 추가 후보");
    summary.newCandidates.forEach(printDecision);
  }
  if (summary.duplicateCandidates.length > 0) {
    console.log("\n기존 중복 후보");
    summary.duplicateCandidates.forEach(printDecision);
  }
  if (summary.warnings.length > 0) {
    console.log("\n확인 필요");
    summary.warnings.forEach((warning) => console.log(`- ${warning}`));
  }
  if (summary.errors.length > 0) {
    console.error("\n차단 오류");
    summary.errors.forEach((error) => console.error(`- ${error}`));
  }
}

async function main() {
  const inputPath = process.argv[2];
  if (!inputPath) {
    console.error("사용법: npm run product-patch:validate -- ./tmp/product-patch.json");
    process.exit(1);
  }

  const summary = createSummary();
  const absolutePath = path.isAbsolute(inputPath) ? inputPath : path.resolve(PROJECT_ROOT, inputPath);
  let parsed: unknown;

  try {
    parsed = JSON.parse(await readFile(absolutePath, "utf8"));
  } catch (error) {
    console.error(`patch JSON을 읽을 수 없습니다: ${absolutePath}`);
    console.error(String(error));
    process.exit(1);
  }

  const patchProducts = validatePatchEnvelope(parsed, summary);
  const currentProducts = existingProducts();
  patchProducts.forEach((product, index) => validateProduct(product, index, summary, currentProducts));

  printSummary(summary);

  if (summary.errors.length > 0) {
    process.exit(1);
  }

  console.log("\nValidation passed. 실제 제품 파일은 수정하지 않았습니다.");
}

main().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
