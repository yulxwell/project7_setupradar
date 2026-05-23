import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { KEYBOARD_FINDER_DEFAULTS, KEYBOARD_FINDER_OPTIONS, KEYBOARD_LAYOUT_META } from "../src/content/kr/finder/keyboardFinderOptions";
import { MOUSE_FINDER_DEFAULTS, MOUSE_FINDER_OPTIONS } from "../src/content/kr/finder/mouseFinderOptions";
import { GUIDES_DATABASE, GUIDE_CATEGORIES } from "../src/content/kr/guides";
import { KEYBOARD_DATABASE } from "../src/content/kr/products/keyboards";
import { MOUSE_DATABASE } from "../src/content/kr/products/mice";
import { SITE_COPY } from "../src/content/kr/siteCopy";
import { SWITCH_DATABASE } from "../src/content/kr/switches";
import { TEST_TOOLS } from "../src/content/kr/tools";
import { BaseContent, KeyboardContent, MouseContent, SwitchContent } from "../src/content/types";

type SnapshotSource = "static_ts" | "control_tower" | "db_export";
type SnapshotStatus = "draft" | "review" | "published";

type SnapshotMetadata = {
  projectId: "project7_setupradar";
  locale: "kr";
  schemaVersion: "0.1.0";
  generatedAt: string;
  source: SnapshotSource;
  status: SnapshotStatus;
};

type Snapshot<T> = {
  metadata: SnapshotMetadata;
  items: T;
};

type ProductCopyFields = Pick<
  BaseContent,
  | "aiSummaryKo"
  | "editorSummaryKo"
  | "aiStrengthsKo"
  | "editorStrengthsKo"
  | "aiWeaknessesKo"
  | "editorWeaknessesKo"
  | "aiCautionsKo"
  | "editorCautionsKo"
  | "aiCommunityNoteKo"
  | "editorCommunityNoteKo"
  | "aiBuyingCheckKo"
  | "editorBuyingCheckKo"
>;

type SwitchCopyFields = Pick<
  SwitchContent,
  | "aiBeginnerSummaryKo"
  | "editorBeginnerSummaryKo"
  | "aiBuyingCheckKo"
  | "editorBuyingCheckKo"
  | "aiCautionKo"
  | "editorCautionKo"
  | "aiNamingWarningKo"
  | "editorNamingWarningKo"
>;

type ValidationSummary = {
  errors: string[];
  warnings: string[];
  snapshotFiles: number;
  mouseProducts: number;
  keyboardProducts: number;
  switches: number;
  tools: number;
  guides: number;
  shellReferences: number;
  publicShellReferences: number;
  productImages: number;
  approvedProductImages: number;
  productLinks: number;
  approvedProductLinks: number;
};

const PROJECT_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SNAPSHOT_ROOT = path.join(PROJECT_ROOT, "snapshots", "kr");
const generatedAt = new Date().toISOString();

const PRODUCT_COPY_KEYS = [
  "aiSummaryKo",
  "editorSummaryKo",
  "aiStrengthsKo",
  "editorStrengthsKo",
  "aiWeaknessesKo",
  "editorWeaknessesKo",
  "aiCautionsKo",
  "editorCautionsKo",
  "aiCommunityNoteKo",
  "editorCommunityNoteKo",
  "aiBuyingCheckKo",
  "editorBuyingCheckKo",
] as const;

const SWITCH_COPY_KEYS = [
  "aiBeginnerSummaryKo",
  "editorBeginnerSummaryKo",
  "aiBuyingCheckKo",
  "editorBuyingCheckKo",
  "aiCautionKo",
  "editorCautionKo",
  "aiNamingWarningKo",
  "editorNamingWarningKo",
] as const;

const SNAPSHOT_STATUS_VALUES = ["draft", "review", "published"] as const;
const CONTENT_STATUS_VALUES = ["draft", "review", "published", "archived"] as const;
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
const PRODUCT_IMAGE_SOURCE_VALUES = ["manual", "official", "affiliate", "placeholder"] as const;
const APPROVAL_STATUS_VALUES = ["pending", "review", "approved", "rejected"] as const;
const PRODUCT_LINK_TYPE_VALUES = ["official", "price_check", "affiliate", "review", "manual"] as const;
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

function createMetadata(status: SnapshotStatus = "review"): SnapshotMetadata {
  return {
    projectId: "project7_setupradar",
    locale: "kr",
    schemaVersion: "0.1.0",
    generatedAt,
    source: "static_ts",
    status,
  };
}

function createSnapshot<T>(items: T, status: SnapshotStatus = "review"): Snapshot<T> {
  return {
    metadata: createMetadata(status),
    items,
  };
}

function extractProductCopy(content: BaseContent): ProductCopyFields {
  return {
    aiSummaryKo: content.aiSummaryKo,
    editorSummaryKo: content.editorSummaryKo,
    aiStrengthsKo: content.aiStrengthsKo,
    editorStrengthsKo: content.editorStrengthsKo,
    aiWeaknessesKo: content.aiWeaknessesKo,
    editorWeaknessesKo: content.editorWeaknessesKo,
    aiCautionsKo: content.aiCautionsKo,
    editorCautionsKo: content.editorCautionsKo,
    aiCommunityNoteKo: content.aiCommunityNoteKo,
    editorCommunityNoteKo: content.editorCommunityNoteKo,
    aiBuyingCheckKo: content.aiBuyingCheckKo,
    editorBuyingCheckKo: content.editorBuyingCheckKo,
  };
}

function extractSwitchCopy(content: SwitchContent): SwitchCopyFields {
  return {
    aiBeginnerSummaryKo: content.aiBeginnerSummaryKo,
    editorBeginnerSummaryKo: content.editorBeginnerSummaryKo,
    aiBuyingCheckKo: content.aiBuyingCheckKo,
    editorBuyingCheckKo: content.editorBuyingCheckKo,
    aiCautionKo: content.aiCautionKo,
    editorCautionKo: content.editorCautionKo,
    aiNamingWarningKo: content.aiNamingWarningKo,
    editorNamingWarningKo: content.editorNamingWarningKo,
  };
}

function omitKeys(source: object, keys: readonly string[]) {
  const result: Record<string, unknown> = { ...source };
  for (const key of keys) {
    delete result[key];
  }
  return result;
}

function normalizeMouseProduct(mouse: MouseContent) {
  const product = omitKeys(mouse, PRODUCT_COPY_KEYS);

  return {
    ...product,
    productImages: mouse.productImages ?? [],
    productLinks: mouse.productLinks ?? [],
    shellReferences: mouse.shellReferences ?? [],
    copy: extractProductCopy(mouse),
  };
}

function normalizeKeyboardProduct(keyboard: KeyboardContent) {
  const product = omitKeys(keyboard, PRODUCT_COPY_KEYS);

  return {
    ...product,
    productImages: keyboard.productImages ?? [],
    productLinks: keyboard.productLinks ?? [],
    copy: extractProductCopy(keyboard),
  };
}

function normalizeSwitchEntry(entry: SwitchContent) {
  const switchEntry = omitKeys(entry, SWITCH_COPY_KEYS);

  return {
    ...switchEntry,
    copy: extractSwitchCopy(entry),
  };
}

function createValidationSummary(snapshotFiles: number): ValidationSummary {
  return {
    errors: [],
    warnings: [],
    snapshotFiles,
    mouseProducts: 0,
    keyboardProducts: 0,
    switches: 0,
    tools: 0,
    guides: 0,
    shellReferences: 0,
    publicShellReferences: 0,
    productImages: 0,
    approvedProductImages: 0,
    productLinks: 0,
    approvedProductLinks: 0,
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function itemLabel(item: Record<string, unknown>, fallback: string) {
  const slug = item.slug;
  const id = item.id;
  const name = item.name;
  if (isNonEmptyString(slug)) return slug;
  if (isNonEmptyString(id)) return id;
  if (isNonEmptyString(name)) return name;
  return fallback;
}

function addError(summary: ValidationSummary, message: string) {
  summary.errors.push(message);
}

function addWarning(summary: ValidationSummary, message: string) {
  summary.warnings.push(message);
}

function hasAllowedValue<T extends readonly string[]>(value: unknown, allowedValues: T): value is T[number] {
  return typeof value === "string" && allowedValues.includes(value);
}

function countMeaningfulValues(value: unknown): number {
  if (!isRecord(value)) return 0;

  return Object.values(value).filter((entry) => {
    if (entry === null || entry === undefined) return false;
    if (Array.isArray(entry)) return entry.length > 0;
    if (isRecord(entry)) return countMeaningfulValues(entry) > 0;
    if (typeof entry === "string") return entry.trim().length > 0;
    return true;
  }).length;
}

function validateSnapshotEnvelope(relativePath: string, snapshot: unknown, summary: ValidationSummary) {
  try {
    JSON.parse(JSON.stringify(snapshot));
  } catch (error) {
    addError(summary, `${relativePath}: JSON stringify/parse failed (${String(error)})`);
  }

  if (!isRecord(snapshot)) {
    addError(summary, `${relativePath}: snapshot root must be an object`);
    return undefined;
  }

  const metadata = snapshot.metadata;
  if (!isRecord(metadata)) {
    addError(summary, `${relativePath}: metadata is missing`);
  } else {
    if (metadata.projectId !== "project7_setupradar") addError(summary, `${relativePath}: metadata.projectId must be project7_setupradar`);
    if (metadata.locale !== "kr") addError(summary, `${relativePath}: metadata.locale must be kr`);
    if (!isNonEmptyString(metadata.schemaVersion)) addError(summary, `${relativePath}: metadata.schemaVersion is required`);
    if (!isNonEmptyString(metadata.generatedAt)) addError(summary, `${relativePath}: metadata.generatedAt is required`);
    if (metadata.source !== "static_ts") addError(summary, `${relativePath}: metadata.source must be static_ts`);
    if (!hasAllowedValue(metadata.status, SNAPSHOT_STATUS_VALUES)) {
      addError(summary, `${relativePath}: metadata.status must be one of ${SNAPSHOT_STATUS_VALUES.join(", ")}`);
    }
  }

  if (!("items" in snapshot) && !("data" in snapshot)) {
    addError(summary, `${relativePath}: items or data must exist`);
    return undefined;
  }

  return "items" in snapshot ? snapshot.items : snapshot.data;
}

function validateRequiredString(
  item: Record<string, unknown>,
  field: string,
  relativePath: string,
  label: string,
  summary: ValidationSummary,
) {
  if (!isNonEmptyString(item[field])) {
    addError(summary, `${relativePath}: ${label}.${field} is required`);
  }
}

function validateContentStatus(
  value: unknown,
  relativePath: string,
  label: string,
  summary: ValidationSummary,
) {
  if (!hasAllowedValue(value, CONTENT_STATUS_VALUES)) {
    addError(summary, `${relativePath}: ${label}.status must be one of ${CONTENT_STATUS_VALUES.join(", ")}`);
    return;
  }

  if (value === "review") {
    addWarning(summary, `${relativePath}: ${label} is review status and may still appear in QA snapshots`);
  }
}

function validateNoDuplicates(
  records: Record<string, unknown>[],
  field: string,
  relativePath: string,
  summary: ValidationSummary,
) {
  const seen = new Set<string>();
  for (const record of records) {
    const value = record[field];
    if (!isNonEmptyString(value)) continue;
    if (seen.has(value)) {
      addError(summary, `${relativePath}: duplicate ${field} "${value}"`);
    }
    seen.add(value);
  }
}

function validateFilterField<T extends readonly string[]>(
  filters: Record<string, unknown>,
  field: string,
  allowedValues: T,
  relativePath: string,
  label: string,
  summary: ValidationSummary,
) {
  const value = filters[field];
  if (!hasAllowedValue(value, allowedValues)) {
    addError(summary, `${relativePath}: ${label}.basicFilters.${field} must be one of ${allowedValues.join(", ")}`);
  }
}

function validateProductImages(
  value: unknown,
  relativePath: string,
  label: string,
  summary: ValidationSummary,
) {
  if (value === undefined) return;
  if (!Array.isArray(value)) {
    addError(summary, `${relativePath}: ${label}.productImages must be an array`);
    return;
  }

  summary.productImages += value.length;
  for (const [index, image] of value.entries()) {
    const imageLabel = `${label}.productImages[${index}]`;
    if (!isRecord(image)) {
      addError(summary, `${relativePath}: ${imageLabel} must be an object`);
      continue;
    }

    const status = image.status;
    if (!hasAllowedValue(image.sourceType, PRODUCT_IMAGE_SOURCE_VALUES)) {
      addError(summary, `${relativePath}: ${imageLabel}.sourceType must be one of ${PRODUCT_IMAGE_SOURCE_VALUES.join(", ")}`);
    }
    if (!hasAllowedValue(status, APPROVAL_STATUS_VALUES)) {
      addError(summary, `${relativePath}: ${imageLabel}.status must be one of ${APPROVAL_STATUS_VALUES.join(", ")}`);
    }
    if (!isNonEmptyString(image.altKo)) {
      addError(summary, `${relativePath}: ${imageLabel}.altKo is required`);
    }
    if (status === "approved") {
      summary.approvedProductImages += 1;
      if (!isNonEmptyString(image.src)) {
        addError(summary, `${relativePath}: ${imageLabel}.src is required for approved images`);
      }
    } else if (!isNonEmptyString(image.src)) {
      addWarning(summary, `${relativePath}: ${imageLabel}.src is empty and will not be public`);
    } else {
      addWarning(summary, `${relativePath}: ${imageLabel} is ${String(status)} and will not be public`);
    }
  }
}

function validateProductLinks(
  value: unknown,
  relativePath: string,
  label: string,
  summary: ValidationSummary,
) {
  if (value === undefined) return;
  if (!Array.isArray(value)) {
    addError(summary, `${relativePath}: ${label}.productLinks must be an array`);
    return;
  }

  summary.productLinks += value.length;
  for (const [index, link] of value.entries()) {
    const linkLabel = `${label}.productLinks[${index}]`;
    if (!isRecord(link)) {
      addError(summary, `${relativePath}: ${linkLabel} must be an object`);
      continue;
    }

    const status = link.status;
    if (!isNonEmptyString(link.labelKo)) {
      addError(summary, `${relativePath}: ${linkLabel}.labelKo is required`);
    }
    if (!hasAllowedValue(link.linkType, PRODUCT_LINK_TYPE_VALUES)) {
      addError(summary, `${relativePath}: ${linkLabel}.linkType must be one of ${PRODUCT_LINK_TYPE_VALUES.join(", ")}`);
    }
    if (!hasAllowedValue(status, APPROVAL_STATUS_VALUES)) {
      addError(summary, `${relativePath}: ${linkLabel}.status must be one of ${APPROVAL_STATUS_VALUES.join(", ")}`);
    }
    if (status === "approved") {
      summary.approvedProductLinks += 1;
      if (!isNonEmptyString(link.url)) {
        addError(summary, `${relativePath}: ${linkLabel}.url is required for approved links`);
      }
    } else if (!isNonEmptyString(link.url)) {
      addWarning(summary, `${relativePath}: ${linkLabel}.url is empty and will not be public`);
    } else {
      addWarning(summary, `${relativePath}: ${linkLabel} is ${String(status)} and will not be public`);
    }
    if (link.linkType === "affiliate" && status !== "approved") {
      addWarning(summary, `${relativePath}: ${linkLabel} is an affiliate link candidate but is not approved`);
    }
  }
}

function validateShellReferences(
  value: unknown,
  relativePath: string,
  label: string,
  summary: ValidationSummary,
) {
  if (value === undefined) return;
  if (!Array.isArray(value)) {
    addError(summary, `${relativePath}: ${label}.shellReferences must be an array`);
    return;
  }

  summary.shellReferences += value.length;
  for (const [index, reference] of value.entries()) {
    const referenceLabel = `${label}.shellReferences[${index}]`;
    if (!isRecord(reference)) {
      addError(summary, `${relativePath}: ${referenceLabel} must be an object`);
      continue;
    }

    if (!hasAllowedValue(reference.relationType, SHELL_RELATION_VALUES)) {
      addError(summary, `${relativePath}: ${referenceLabel}.relationType must be one of ${SHELL_RELATION_VALUES.join(", ")}`);
    }
    if (!hasAllowedValue(reference.confidence, SHELL_CONFIDENCE_VALUES)) {
      addError(summary, `${relativePath}: ${referenceLabel}.confidence must be one of ${SHELL_CONFIDENCE_VALUES.join(", ")}`);
    }
    if (!hasAllowedValue(reference.sourceHint, SHELL_SOURCE_VALUES)) {
      addError(summary, `${relativePath}: ${referenceLabel}.sourceHint must be one of ${SHELL_SOURCE_VALUES.join(", ")}`);
    }

    const hasReferenceModel = isNonEmptyString(reference.referenceModelKo) || isNonEmptyString(reference.referenceModelEn);
    const publicReady =
      isNonEmptyString(reference.editorNoteKo) &&
      (reference.confidence === "medium" || reference.confidence === "high") &&
      reference.sourceHint !== "unknown" &&
      hasReferenceModel;

    if (publicReady) {
      summary.publicShellReferences += 1;
    } else {
      addWarning(summary, `${relativePath}: ${referenceLabel} is stored but not public-ready`);
    }

    if (reference.confidence === "low") {
      addWarning(summary, `${relativePath}: ${referenceLabel} has low confidence`);
    }
  }
}

function validateProductCopy(item: Record<string, unknown>, relativePath: string, label: string, summary: ValidationSummary) {
  const copy = item.copy;
  if (!isRecord(copy)) {
    addError(summary, `${relativePath}: ${label}.copy is required`);
    return;
  }

  const hasSummary = isNonEmptyString(copy.aiSummaryKo) || isNonEmptyString(copy.editorSummaryKo);
  const hasListCopy =
    Array.isArray(copy.aiStrengthsKo) ||
    Array.isArray(copy.editorStrengthsKo) ||
    Array.isArray(copy.aiCautionsKo) ||
    Array.isArray(copy.editorCautionsKo) ||
    Array.isArray(copy.aiBuyingCheckKo) ||
    Array.isArray(copy.editorBuyingCheckKo);

  if (!hasSummary && !hasListCopy) {
    addError(summary, `${relativePath}: ${label}.copy must contain at least summary or list copy fields`);
  }
}

function validateProducts(
  items: unknown,
  category: "mouse" | "keyboard",
  relativePath: string,
  summary: ValidationSummary,
) {
  if (!Array.isArray(items)) {
    addError(summary, `${relativePath}: items must be an array`);
    return;
  }

  const records = items.filter(isRecord);
  if (records.length !== items.length) {
    addError(summary, `${relativePath}: every product item must be an object`);
  }

  validateNoDuplicates(records, "id", relativePath, summary);
  validateNoDuplicates(records, "slug", relativePath, summary);

  if (category === "mouse") summary.mouseProducts = records.length;
  if (category === "keyboard") summary.keyboardProducts = records.length;

  for (const [index, item] of records.entries()) {
    const label = itemLabel(item, `${category}[${index}]`);
    validateRequiredString(item, "id", relativePath, label, summary);
    validateRequiredString(item, "slug", relativePath, label, summary);
    validateRequiredString(item, "brand", relativePath, label, summary);
    validateRequiredString(item, "name", relativePath, label, summary);
    validateRequiredString(item, "category", relativePath, label, summary);
    validateContentStatus(item.status, relativePath, label, summary);

    if (item.category !== category) {
      addError(summary, `${relativePath}: ${label}.category must be ${category}`);
    }

    const basicFilters = item.basicFilters;
    if (!isRecord(basicFilters)) {
      addError(summary, `${relativePath}: ${label}.basicFilters is required`);
    } else if (category === "mouse") {
      validateFilterField(basicFilters, "shape", MOUSE_BASIC_FILTER_VALUES.shape, relativePath, label, summary);
      validateFilterField(basicFilters, "weight", MOUSE_BASIC_FILTER_VALUES.weight, relativePath, label, summary);
      validateFilterField(basicFilters, "connection", MOUSE_BASIC_FILTER_VALUES.connection, relativePath, label, summary);
      validateFilterField(basicFilters, "size", MOUSE_BASIC_FILTER_VALUES.size, relativePath, label, summary);
      validateFilterField(basicFilters, "price", MOUSE_BASIC_FILTER_VALUES.price, relativePath, label, summary);
    } else {
      validateFilterField(basicFilters, "layout", KEYBOARD_BASIC_FILTER_VALUES.layout, relativePath, label, summary);
      validateFilterField(basicFilters, "connection", KEYBOARD_BASIC_FILTER_VALUES.connection, relativePath, label, summary);
      validateFilterField(basicFilters, "feel", KEYBOARD_BASIC_FILTER_VALUES.feel, relativePath, label, summary);
      validateFilterField(basicFilters, "noise", KEYBOARD_BASIC_FILTER_VALUES.noise, relativePath, label, summary);
      validateFilterField(basicFilters, "price", KEYBOARD_BASIC_FILTER_VALUES.price, relativePath, label, summary);
    }

    validateProductCopy(item, relativePath, label, summary);
    validateProductImages(item.productImages, relativePath, label, summary);
    validateProductLinks(item.productLinks, relativePath, label, summary);

    if (category === "mouse") {
      validateShellReferences(item.shellReferences, relativePath, label, summary);
    }

    if (isRecord(item.rawSpecs) && isNonEmptyString(item.rawSpecs.note) && countMeaningfulValues(item.detailSpecs) <= 1) {
      addWarning(summary, `${relativePath}: ${label} has mostly rawSpecs.note and limited detailSpecs`);
    }
  }
}

function validateSwitches(items: unknown, relativePath: string, summary: ValidationSummary) {
  if (!Array.isArray(items)) {
    addError(summary, `${relativePath}: items must be an array`);
    return;
  }

  const records = items.filter(isRecord);
  if (records.length !== items.length) {
    addError(summary, `${relativePath}: every switch item must be an object`);
  }

  summary.switches = records.length;
  validateNoDuplicates(records, "id", relativePath, summary);
  validateNoDuplicates(records, "slug", relativePath, summary);

  for (const [index, item] of records.entries()) {
    const label = itemLabel(item, `switch[${index}]`);
    validateRequiredString(item, "id", relativePath, label, summary);
    if (!isNonEmptyString(item.name) && !isNonEmptyString(item.title)) {
      addError(summary, `${relativePath}: ${label}.name or title is required`);
    }
    validateContentStatus(item.status, relativePath, label, summary);
  }
}

function validateTools(items: unknown, relativePath: string, summary: ValidationSummary) {
  if (!Array.isArray(items)) {
    addError(summary, `${relativePath}: items must be an array`);
    return;
  }

  const records = items.filter(isRecord);
  summary.tools = records.length;
  validateNoDuplicates(records, "id", relativePath, summary);
  validateNoDuplicates(records, "href", relativePath, summary);

  for (const [index, item] of records.entries()) {
    const label = itemLabel(item, `tool[${index}]`);
    validateRequiredString(item, "id", relativePath, label, summary);
    if (!isNonEmptyString(item.title) && !isNonEmptyString(item.label)) {
      addError(summary, `${relativePath}: ${label}.title or label is required`);
    }
  }
}

function validateGuides(items: unknown, relativePath: string, summary: ValidationSummary) {
  if (!isRecord(items)) {
    addError(summary, `${relativePath}: items must be an object with categories and guides`);
    return;
  }

  const guides = items.guides;
  const categories = items.categories;
  if (!Array.isArray(guides)) {
    addError(summary, `${relativePath}: items.guides must be an array`);
    return;
  }

  const guideRecords = guides.filter(isRecord);
  summary.guides = guideRecords.length;
  validateNoDuplicates(guideRecords, "id", relativePath, summary);
  validateNoDuplicates(guideRecords, "href", relativePath, summary);

  for (const [index, guide] of guideRecords.entries()) {
    const label = itemLabel(guide, `guide[${index}]`);
    validateRequiredString(guide, "id", relativePath, label, summary);
    if (!isNonEmptyString(guide.title) && !isNonEmptyString(guide.name)) {
      addError(summary, `${relativePath}: ${label}.title or name is required`);
    }
  }

  if (Array.isArray(categories)) {
    const categoryRecords = categories.filter(isRecord);
    validateNoDuplicates(categoryRecords, "id", relativePath, summary);
  }
}

function validateFinderOptions(items: unknown, relativePath: string, summary: ValidationSummary) {
  if (!isRecord(items)) {
    addError(summary, `${relativePath}: items must be an object`);
    return;
  }

  const groups = items.groups;
  if (!Array.isArray(groups) && !isRecord(groups)) {
    addError(summary, `${relativePath}: items.groups must be an array or object map`);
    return;
  }

  const groupEntries = Array.isArray(groups) ? groups.entries() : Object.values(groups).entries();

  for (const [groupIndex, group] of groupEntries) {
    if (!isRecord(group)) {
      addError(summary, `${relativePath}: groups[${groupIndex}] must be an object`);
      continue;
    }
    if (!isNonEmptyString(group.label)) {
      addError(summary, `${relativePath}: groups[${groupIndex}].label is required`);
    }

    const options = group.options;
    if (!Array.isArray(options)) {
      addError(summary, `${relativePath}: groups[${groupIndex}].options must be an array`);
      continue;
    }

    const seenValues = new Set<string>();
    for (const [optionIndex, option] of options.entries()) {
      if (!isRecord(option)) {
        addError(summary, `${relativePath}: groups[${groupIndex}].options[${optionIndex}] must be an object`);
        continue;
      }

      if (!isNonEmptyString(option.label)) {
        addError(summary, `${relativePath}: groups[${groupIndex}].options[${optionIndex}].label is required`);
      }
      if (!isNonEmptyString(option.value)) {
        addError(summary, `${relativePath}: groups[${groupIndex}].options[${optionIndex}].value is required`);
        continue;
      }
      if (seenValues.has(option.value)) {
        addError(summary, `${relativePath}: duplicate option value "${option.value}" in groups[${groupIndex}]`);
      }
      seenValues.add(option.value);
    }
  }
}

function scanBannedTerms(
  relativePath: string,
  value: unknown,
  summary: ValidationSummary,
  fieldPath = "$",
  currentItem = "snapshot",
) {
  if (typeof value === "string") {
    for (const term of BANNED_TERMS) {
      if (value.includes(term)) {
        addError(summary, `${relativePath}: banned term "${term}" found in ${currentItem} at ${fieldPath}`);
      }
    }
    return;
  }

  if (Array.isArray(value)) {
    value.forEach((entry, index) => {
      scanBannedTerms(relativePath, entry, summary, `${fieldPath}[${index}]`, currentItem);
    });
    return;
  }

  if (!isRecord(value)) return;

  const nextItem =
    currentItem === "snapshot" && (isNonEmptyString(value.slug) || isNonEmptyString(value.id))
      ? itemLabel(value, currentItem)
      : currentItem;

  for (const [key, entry] of Object.entries(value)) {
    scanBannedTerms(relativePath, entry, summary, `${fieldPath}.${key}`, nextItem);
  }
}

function validateAllSnapshots(snapshots: Array<[string, unknown]>) {
  const summary = createValidationSummary(snapshots.length);

  for (const [relativePath, snapshot] of snapshots) {
    const items = validateSnapshotEnvelope(relativePath, snapshot, summary);
    scanBannedTerms(relativePath, items, summary, "$.items");

    switch (relativePath) {
      case "products/mice.json":
        validateProducts(items, "mouse", relativePath, summary);
        break;
      case "products/keyboards.json":
        validateProducts(items, "keyboard", relativePath, summary);
        break;
      case "switches.json":
        validateSwitches(items, relativePath, summary);
        break;
      case "tools.json":
        validateTools(items, relativePath, summary);
        break;
      case "guides.json":
        validateGuides(items, relativePath, summary);
        break;
      case "finder/mouse-options.json":
      case "finder/keyboard-options.json":
        validateFinderOptions(items, relativePath, summary);
        break;
      default:
        break;
    }
  }

  return summary;
}

function printValidationSummary(summary: ValidationSummary) {
  if (summary.warnings.length > 0) {
    console.warn(`Snapshot validation warnings (${summary.warnings.length}):`);
    for (const warning of summary.warnings) {
      console.warn(`- ${warning}`);
    }
  }

  if (summary.errors.length > 0) {
    console.error(`Snapshot validation failed (${summary.errors.length} errors):`);
    for (const error of summary.errors) {
      console.error(`- ${error}`);
    }
    throw new Error("Content snapshot validation failed");
  }

  console.log("Snapshot validation summary:");
  console.log(`- Snapshot files: ${summary.snapshotFiles}`);
  console.log(`- Mouse products: ${summary.mouseProducts}`);
  console.log(`- Keyboard products: ${summary.keyboardProducts}`);
  console.log(`- Switch entries: ${summary.switches}`);
  console.log(`- Tools: ${summary.tools}`);
  console.log(`- Guides: ${summary.guides}`);
  console.log(`- Shell references: ${summary.shellReferences} total / ${summary.publicShellReferences} public-ready`);
  console.log(`- Product images: ${summary.productImages} total / ${summary.approvedProductImages} approved`);
  console.log(`- Product links: ${summary.productLinks} total / ${summary.approvedProductLinks} approved`);
  console.log(`- Warnings: ${summary.warnings.length}`);
  console.log("Snapshot validation passed.");
}

async function writeJson(relativePath: string, data: unknown) {
  const outputPath = path.join(SNAPSHOT_ROOT, relativePath);
  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, `${JSON.stringify(data, null, 2)}\n`, "utf8");
  return outputPath;
}

async function main() {
  const snapshots: Array<[string, unknown]> = [
    ["site-copy.json", createSnapshot(SITE_COPY)],
    ["tools.json", createSnapshot(TEST_TOOLS)],
    [
      "guides.json",
      createSnapshot({
        categories: GUIDE_CATEGORIES,
        guides: GUIDES_DATABASE,
      }),
    ],
    ["products/mice.json", createSnapshot(MOUSE_DATABASE.map(normalizeMouseProduct))],
    ["products/keyboards.json", createSnapshot(KEYBOARD_DATABASE.map(normalizeKeyboardProduct))],
    ["switches.json", createSnapshot(SWITCH_DATABASE.map(normalizeSwitchEntry))],
    [
      "finder/mouse-options.json",
      createSnapshot({
        defaults: MOUSE_FINDER_DEFAULTS,
        groups: MOUSE_FINDER_OPTIONS,
      }),
    ],
    [
      "finder/keyboard-options.json",
      createSnapshot({
        defaults: KEYBOARD_FINDER_DEFAULTS,
        layoutMeta: KEYBOARD_LAYOUT_META,
        groups: KEYBOARD_FINDER_OPTIONS,
      }),
    ],
  ];

  printValidationSummary(validateAllSnapshots(snapshots));

  const writtenFiles = [];
  for (const [relativePath, data] of snapshots) {
    writtenFiles.push(await writeJson(relativePath, data));
  }

  console.log(`Exported ${writtenFiles.length} content snapshots:`);
  for (const filePath of writtenFiles) {
    console.log(`- ${path.relative(PROJECT_ROOT, filePath)}`);
  }
}

main().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
