/**
 * 语言配置常量
 *
 * 定义 Trellis 支持的语言选项和对应的提示文本
 */

/** 支持的语言列表 */
export const SUPPORTED_LANGUAGES = ["en", "zh"] as const;

/** 支持的语言类型 */
export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

/** 默认语言 */
export const DEFAULT_LANGUAGE: SupportedLanguage = "en";

/**
 * 各语言对应的文档提示文本
 * 用于替换模板中的 {{LANGUAGE_PROMPT}} 占位符
 */
export const LANGUAGE_PROMPTS: Record<SupportedLanguage, string> = {
  en: "All documentation should be written in **English**.",
  zh: "所有文档建议使用**中文**编写。",
};

/** 模板中的语言占位符 */
export const LANGUAGE_PLACEHOLDER = "{{LANGUAGE_PROMPT}}";
