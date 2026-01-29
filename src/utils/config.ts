/**
 * Trellis 配置文件工具
 *
 * 提供配置文件的读写功能，用于存储项目级别的配置（如语言设置）
 */

import fs from "node:fs";
import path from "node:path";
import { parse } from "yaml";
import { PATHS } from "../constants/paths.js";
import {
  DEFAULT_LANGUAGE,
  SUPPORTED_LANGUAGES,
  type SupportedLanguage,
} from "../constants/languages.js";

/**
 * Trellis 配置接口
 */
export interface TrellisConfig {
  /** 文档语言设置 */
  language: SupportedLanguage;
}

/**
 * 默认配置
 */
const DEFAULT_CONFIG: TrellisConfig = {
  language: DEFAULT_LANGUAGE,
};

/**
 * 加载配置文件
 *
 * @param cwd - 项目根目录
 * @returns 配置对象，如果配置文件不存在则返回默认配置
 */
export function loadConfig(cwd: string): TrellisConfig {
  const configPath = path.join(cwd, PATHS.CONFIG_FILE);

  if (!fs.existsSync(configPath)) {
    return { ...DEFAULT_CONFIG };
  }

  try {
    const content = fs.readFileSync(configPath, "utf-8");
    const parsed = parse(content) as Partial<TrellisConfig>;

    // 验证并返回配置，对无效值使用默认值
    return {
      language: isValidLanguage(parsed.language)
        ? parsed.language
        : DEFAULT_LANGUAGE,
    };
  } catch {
    // 解析失败时返回默认配置
    return { ...DEFAULT_CONFIG };
  }
}

/**
 * 保存配置文件
 *
 * @param cwd - 项目根目录
 * @param config - 要保存的配置对象
 */
export function saveConfig(cwd: string, config: TrellisConfig): void {
  const configPath = path.join(cwd, PATHS.CONFIG_FILE);

  const content = `# Trellis Configuration

# Language for documentation (en/zh)
language: ${config.language}
`;

  fs.writeFileSync(configPath, content, "utf-8");
}

/**
 * 验证语言值是否有效
 *
 * @param lang - 要验证的语言值
 * @returns 是否为有效语言
 */
export function isValidLanguage(
  lang: unknown,
): lang is SupportedLanguage {
  return (
    typeof lang === "string" &&
    SUPPORTED_LANGUAGES.includes(lang as SupportedLanguage)
  );
}
