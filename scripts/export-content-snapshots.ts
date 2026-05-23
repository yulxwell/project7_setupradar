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

const PROJECT_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SNAPSHOT_ROOT = path.join(PROJECT_ROOT, "snapshots", "kr");
const generatedAt = new Date().toISOString();

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

function normalizeMouseProduct(mouse: MouseContent) {
  const {
    aiSummaryKo,
    editorSummaryKo,
    aiStrengthsKo,
    editorStrengthsKo,
    aiWeaknessesKo,
    editorWeaknessesKo,
    aiCautionsKo,
    editorCautionsKo,
    aiCommunityNoteKo,
    editorCommunityNoteKo,
    aiBuyingCheckKo,
    editorBuyingCheckKo,
    ...product
  } = mouse;

  void aiSummaryKo;
  void editorSummaryKo;
  void aiStrengthsKo;
  void editorStrengthsKo;
  void aiWeaknessesKo;
  void editorWeaknessesKo;
  void aiCautionsKo;
  void editorCautionsKo;
  void aiCommunityNoteKo;
  void editorCommunityNoteKo;
  void aiBuyingCheckKo;
  void editorBuyingCheckKo;

  return {
    ...product,
    productImages: product.productImages ?? [],
    productLinks: product.productLinks ?? [],
    shellReferences: product.shellReferences ?? [],
    copy: extractProductCopy(mouse),
  };
}

function normalizeKeyboardProduct(keyboard: KeyboardContent) {
  const {
    aiSummaryKo,
    editorSummaryKo,
    aiStrengthsKo,
    editorStrengthsKo,
    aiWeaknessesKo,
    editorWeaknessesKo,
    aiCautionsKo,
    editorCautionsKo,
    aiCommunityNoteKo,
    editorCommunityNoteKo,
    aiBuyingCheckKo,
    editorBuyingCheckKo,
    ...product
  } = keyboard;

  void aiSummaryKo;
  void editorSummaryKo;
  void aiStrengthsKo;
  void editorStrengthsKo;
  void aiWeaknessesKo;
  void editorWeaknessesKo;
  void aiCautionsKo;
  void editorCautionsKo;
  void aiCommunityNoteKo;
  void editorCommunityNoteKo;
  void aiBuyingCheckKo;
  void editorBuyingCheckKo;

  return {
    ...product,
    productImages: product.productImages ?? [],
    productLinks: product.productLinks ?? [],
    copy: extractProductCopy(keyboard),
  };
}

function normalizeSwitchEntry(entry: SwitchContent) {
  const {
    aiBeginnerSummaryKo,
    editorBeginnerSummaryKo,
    aiBuyingCheckKo,
    editorBuyingCheckKo,
    aiCautionKo,
    editorCautionKo,
    aiNamingWarningKo,
    editorNamingWarningKo,
    ...switchEntry
  } = entry;

  void aiBeginnerSummaryKo;
  void editorBeginnerSummaryKo;
  void aiBuyingCheckKo;
  void editorBuyingCheckKo;
  void aiCautionKo;
  void editorCautionKo;
  void aiNamingWarningKo;
  void editorNamingWarningKo;

  return {
    ...switchEntry,
    copy: extractSwitchCopy(entry),
  };
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
  process.exitCode = 1;
});
