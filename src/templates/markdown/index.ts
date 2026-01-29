/**
 * Markdown templates for Trellis workflow
 *
 * These are GENERIC templates for new projects.
 * Structure templates use .md.txt extension as they are generic templates.
 */

import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  LANGUAGE_PLACEHOLDER,
  LANGUAGE_PROMPTS,
  type SupportedLanguage,
} from "../../constants/languages.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Read a template file from src/templates/markdown/
 */
function readLocalTemplate(filename: string): string {
  const filePath = join(__dirname, filename);
  return readFileSync(filePath, "utf-8");
}

// =============================================================================
// Root files for new projects
// =============================================================================

export const agentsMdContent: string = readLocalTemplate("agents.md");

// Workspace index template (developer work records)
export const workspaceIndexContent: string =
  readLocalTemplate("workspace-index.md");

// Backwards compatibility alias
export const agentProgressIndexContent = workspaceIndexContent;

// Gitignore (template file - .gitignore is ignored by npm)
export const workflowGitignoreContent: string =
  readLocalTemplate("gitignore.txt");

// =============================================================================
// Structure templates (generic templates from .txt files)
// These are NOT dogfooded - they are generic templates for new projects
// =============================================================================

// Backend structure (multi-doc format)
export const backendIndexContent: string = readLocalTemplate(
  "spec/backend/index.md.txt",
);
export const backendDirectoryStructureContent: string = readLocalTemplate(
  "spec/backend/directory-structure.md.txt",
);
export const backendDatabaseGuidelinesContent: string = readLocalTemplate(
  "spec/backend/database-guidelines.md.txt",
);
export const backendLoggingGuidelinesContent: string = readLocalTemplate(
  "spec/backend/logging-guidelines.md.txt",
);
export const backendQualityGuidelinesContent: string = readLocalTemplate(
  "spec/backend/quality-guidelines.md.txt",
);
export const backendErrorHandlingContent: string = readLocalTemplate(
  "spec/backend/error-handling.md.txt",
);

// Frontend structure (multi-doc format)
export const frontendIndexContent: string = readLocalTemplate(
  "spec/frontend/index.md.txt",
);
export const frontendDirectoryStructureContent: string = readLocalTemplate(
  "spec/frontend/directory-structure.md.txt",
);
export const frontendTypeSafetyContent: string = readLocalTemplate(
  "spec/frontend/type-safety.md.txt",
);
export const frontendHookGuidelinesContent: string = readLocalTemplate(
  "spec/frontend/hook-guidelines.md.txt",
);
export const frontendComponentGuidelinesContent: string = readLocalTemplate(
  "spec/frontend/component-guidelines.md.txt",
);
export const frontendQualityGuidelinesContent: string = readLocalTemplate(
  "spec/frontend/quality-guidelines.md.txt",
);
export const frontendStateManagementContent: string = readLocalTemplate(
  "spec/frontend/state-management.md.txt",
);

// Guides structure
export const guidesIndexContent: string = readLocalTemplate(
  "spec/guides/index.md.txt",
);
export const guidesCrossLayerThinkingGuideContent: string = readLocalTemplate(
  "spec/guides/cross-layer-thinking-guide.md.txt",
);
export const guidesCodeReuseThinkingGuideContent: string = readLocalTemplate(
  "spec/guides/code-reuse-thinking-guide.md.txt",
);

// =============================================================================
// Template processing utilities
// =============================================================================

/**
 * 处理模板中的语言占位符
 *
 * 将模板中的 {{LANGUAGE_PROMPT}} 替换为对应语言的提示文本
 *
 * @param template - 包含占位符的模板内容
 * @param language - 目标语言
 * @returns 替换后的模板内容
 */
export function processTemplate(
  template: string,
  language: SupportedLanguage,
): string {
  return template.replace(LANGUAGE_PLACEHOLDER, LANGUAGE_PROMPTS[language]);
}
