# Init Language Selection

## Goal

为 `trellis init` 命令添加语言选择功能，让用户可以选择 spec 文档的语言要求（English 或 Chinese）。

## Requirements

1. **新增配置文件** `.trellis/config.yml`
   - 只存储 `language` 字段
   - 值为 `en` 或 `zh`

2. **init 流程增加语言选择**
   - 在选择 AI 工具之前，让用户选择语言
   - 使用 inquirer 的 `list` 类型实现单选
   - 提示信息双语：`Select documentation language / 选择文档语言:`
   - 选项：`Chinese (中文)` (默认) 和 `English`

3. **模板生成时替换语言说明**
   - 只需替换 `spec/frontend/index.md` 和 `spec/backend/index.md` 中的语言说明
   - 原文：`**Language**: All documentation should be written in **English**.`
   - 当选择 `zh` 时替换为：`**Language**: All documentation should be written in **Chinese**.`

4. **修改 npm 发布配置**
   - 包名从 `@mindfoldhq/trellis` 改为 `@huajiwuyan/trellis`
   - 版本号从 `0.2.11` 升级到 `1.0.0`

## Acceptance Criteria

- [ ] `trellis init` 第一步显示语言选择
- [ ] 选择后生成 `.trellis/config.yml` 文件，内容为 `language: en` 或 `language: zh`
- [ ] spec/frontend/index.md 和 spec/backend/index.md 中的语言说明根据选择正确替换
- [ ] `-y` 参数跳过交互时使用默认值 `zh`
- [ ] package.json 中包名改为 `@huajiwuyan/trellis`，版本号为 `1.0.0`
- [ ] lint 和 typecheck 通过

## Technical Notes

### 修改文件

| 文件 | 改动 |
|------|------|
| `src/commands/init.ts` | 添加语言选择交互，写入 config.yml，传递 language 给 createWorkflowStructure |
| `src/configurators/workflow.ts` | WorkflowOptions 接口添加 language，createSpecTemplates 实现语言替换 |

### 语言映射

```typescript
const LANGUAGE_MAP: Record<string, string> = {
  en: "English",
  zh: "Chinese",
};
```

### 替换逻辑

```typescript
function applyLanguage(content: string, language: string): string {
  const langName = LANGUAGE_MAP[language] || "English";
  return content.replace(
    /\*\*Language\*\*: All documentation should be written in \*\*English\*\*\./g,
    `**Language**: All documentation should be written in **${langName}**.`
  );
}
```
