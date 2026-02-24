# Configuration Guide

[English](#english) | [中文](#中文)

---

<a name="english"></a>
## English

vue-health can be configured via `.vue-healthrc` or `.vue-healthrc.json` in your project root.

---

## Configuration File Location

vue-health searches for configuration files in the following order:

1. `.vue-healthrc` (JSON)
2. `.vue-healthrc.json` (JSON)
3. `vue-health.config.json` (JSON)
4. `vue-health` property in `package.json`

---

## Full Configuration Schema

```json
{
  "$schema": "https://raw.githubusercontent.com/zhyt1985/vue-health/main/schema.json",
  "lint": true,
  "deadCode": true,
  "verbose": false,
  "diff": false,
  "deep": false,
  "ignore": {
    "rules": ["no-v-html"],
    "files": ["src/legacy/**", "vendor/**"]
  },
  "eslint": {
    "configFile": "./.eslintrc.js"
  }
}
```

---

## Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `lint` | `boolean` | `true` | Enable/disable linting checks |
| `deadCode` | `boolean` | `true` | Enable/disable dead code detection (via knip) |
| `verbose` | `boolean` | `false` | Show file details for each diagnostic |
| `diff` | `boolean\|string` | `false` | Scan only changed files. Set to `true` for auto-detect, or specify branch name (e.g., `"main"`) |
| `deep` | `boolean` | `false` | Use ESLint deep analysis instead of oxlint (slower but more rules) |
| `ignore.rules` | `string[]` | `[]` | List of rule IDs to ignore (e.g., `["no-v-html", "no-console"]`) |
| `ignore.files` | `string[]` | `[]` | Glob patterns for files/directories to ignore (e.g., `["src/legacy/**"]`) |
| `eslint.configFile` | `string` | `undefined` | Path to ESLint config file (used when `deep: true`) |

---

## Ignore Patterns

### Ignore Rules

```json
{
  "ignore": {
    "rules": [
      "no-v-html",
      "no-console",
      "require-v-for-key"
    ]
  }
}
```

**Rule IDs** are formatted as `plugin/rule-name` (e.g., `vue/no-mutating-props`, `typescript/no-unused-vars`).

You can omit the plugin prefix for Vue rules:

```json
{
  "ignore": {
    "rules": ["no-mutating-props", "no-v-html"]
  }
}
```

### Ignore Files

```json
{
  "ignore": {
    "files": [
      "src/legacy/**",
      "vendor/**",
      "**/*.spec.ts",
      "**/*.test.ts"
    ]
  }
}
```

**Supported glob patterns**:
- `**/*.ts` — All TypeScript files
- `src/legacy/**` — All files in `src/legacy/` directory
- `**/*.{test,spec}.ts` — All test files

---

## Mode Configuration

### Diff Mode

```json
{
  "diff": true
}
```

Or specify a base branch:

```json
{
  "diff": "main"
}
```

**Behavior**:
- `true` — Auto-detect base branch (typically `main` or `master`)
- `"branch-name"` — Use specified branch as base
- Scans only files changed vs the base branch

### Verbose Mode

```json
{
  "verbose": true
}
```

Shows file paths and line numbers for each diagnostic.

### Deep Mode (ESLint)

```json
{
  "deep": true,
  "eslint": {
    "configFile": "./custom-eslintrc.js"
  }
}
```

**Note**: Deep mode uses ESLint instead of oxlint. It's slower but provides more rules and customization via your ESLint config.

---

## Monorepo Configuration

For monorepos, place `.vue-healthrc` in the workspace root to apply to all projects:

```
my-monorepo/
├── .vue-healthrc          # Root config (applies to all)
├── packages/
│   ├── app-a/
│   │   └── .vue-healthrc  # Override for app-a
│   └── app-b/
└── package.json
```

Project-specific configs override root config values.

---

## Environment-Specific Configuration

You can use different configs via environment variables:

```bash
# Use production config
VUE_HEALTH_ENV=production vue-health .

# Or specify config file path
VUE_HEALTH_CONFIG=.vue-healthrc.prod vue-health .
```

---

## Schema Validation

Add the `$schema` property for IDE autocomplete and validation:

```json
{
  "$schema": "https://raw.githubusercontent.com/zhyt1985/vue-health/main/schema.json",
  "lint": true
}
```

---

<a name="中文"></a>
## 中文

vue-health 可通过项目根目录中的 `.vue-healthrc` 或 `.vue-healthrc.json` 配置。

---

## 配置文件位置

vue-health 按以下顺序搜索配置文件：

1. `.vue-healthrc` (JSON)
2. `.vue-healthrc.json` (JSON)
3. `vue-health.config.json` (JSON)
4. `package.json` 中的 `vue-health` 属性

---

## 完整配置模式

```json
{
  "$schema": "https://raw.githubusercontent.com/zhyt1985/vue-health/main/schema.json",
  "lint": true,
  "deadCode": true,
  "verbose": false,
  "diff": false,
  "deep": false,
  "ignore": {
    "rules": ["no-v-html"],
    "files": ["src/legacy/**", "vendor/**"]
  },
  "eslint": {
    "configFile": "./.eslintrc.js"
  }
}
```

---

## 配置选项

| 选项 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `lint` | `boolean` | `true` | 启用/禁用 lint 检查 |
| `deadCode` | `boolean` | `true` | 启用/禁用死代码检测（via knip）|
| `verbose` | `boolean` | `false` | 显示每条诊断的文件详情 |
| `diff` | `boolean\|string` | `false` | 仅扫描变更文件。设为 `true` 自动检测，或指定分支名（如 `"main"`）|
| `deep` | `boolean` | `false` | 使用 ESLint 深度分析替代 oxlint（更慢但规则更多）|
| `ignore.rules` | `string[]` | `[]` | 要忽略的规则 ID 列表（如 `["no-v-html", "no-console"]`）|
| `ignore.files` | `string[]` | `[]` | 要忽略的文件/目录的 glob 模式（如 `["src/legacy/**"]`）|
| `eslint.configFile` | `string` | `undefined` | ESLint 配置文件路径（`deep: true` 时使用）|

---

## 忽略模式

### 忽略规则

```json
{
  "ignore": {
    "rules": [
      "no-v-html",
      "no-console",
      "require-v-for-key"
    ]
  }
}
```

**规则 ID** 格式为 `plugin/rule-name`（如 `vue/no-mutating-props`、`typescript/no-unused-vars`）。

Vue 规则可省略插件前缀：

```json
{
  "ignore": {
    "rules": ["no-mutating-props", "no-v-html"]
  }
}
```

### 忽略文件

```json
{
  "ignore": {
    "files": [
      "src/legacy/**",
      "vendor/**",
      "**/*.spec.ts",
      "**/*.test.ts"
    ]
  }
}
```

**支持的 glob 模式**：
- `**/*.ts` — 所有 TypeScript 文件
- `src/legacy/**` — `src/legacy/` 目录中的所有文件
- `**/*.{test,spec}.ts` — 所有测试文件

---

## 模式配置

### Diff 模式

```json
{
  "diff": true
}
```

或指定基础分支：

```json
{
  "diff": "main"
}
```

**行为**：
- `true` — 自动检测基础分支（通常是 `main` 或 `master`）
- `"分支名"` — 使用指定的分支作为基础
- 仅扫描相对于基础分支变更的文件

### Verbose 模式

```json
{
  "verbose": true
}
```

显示每条诊断的文件路径和行号。

### Deep 模式（ESLint）

```json
{
  "deep": true,
  "eslint": {
    "configFile": "./custom-eslintrc.js"
  }
}
```

**注意**：Deep 模式使用 ESLint 而非 oxlint。速度较慢但提供更多规则和通过 ESLint 配置的自定义。

---

## Monorepo 配置

对于 monorepo，在 workspace 根目录放置 `.vue-healthrc` 以应用于所有项目：

```
my-monorepo/
├── .vue-healthrc          # 根配置（适用于所有）
├── packages/
│   ├── app-a/
│   │   └── .vue-healthrc  # app-a 的覆盖配置
│   └── app-b/
└── package.json
```

项目特定配置覆盖根配置值。

---

## 特定环境配置

可通过环境变量使用不同配置：

```bash
# 使用生产配置
VUE_HEALTH_ENV=production vue-health .

# 或指定配置文件路径
VUE_HEALTH_CONFIG=.vue-healthrc.prod vue-health .
```

---

## 模式验证

添加 `$schema` 属性以获得 IDE 自动补全和验证：

```json
{
  "$schema": "https://raw.githubusercontent.com/zhyt1985/vue-health/main/schema.json",
  "lint": true
}
```
