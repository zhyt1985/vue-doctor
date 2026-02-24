# CLI Options Reference

[English](#english) | [中文](#中文)

---

<a name="english"></a>
## English

Complete reference for all vue-health CLI options.

---

## Syntax

```bash
vue-health [directory] [options]
```

---

## Arguments

### `[directory]`

**Type**: `string`
**Default**: `"."` (current directory)
**Description**: Path to the Vue project directory to scan

**Examples**:
```bash
vue-health .                    # Scan current directory
vue-health ./my-app             # Scan specific directory
vue-health ../packages/app-a    # Scan relative path
```

---

## Options

### `-v, --version`

**Description**: Display the version number

**Example**:
```bash
vue-health --version
# Output: 2.0.0
```

---

### `--no-lint`

**Description**: Skip linting checks

**Use case**: Faster scan when you only want dead code detection

**Example**:
```bash
vue-health . --no-lint
```

---

### `--no-dead-code`

**Description**: Skip dead code detection (knip)

**Use case**: Faster scan when you only want linting

**Example**:
```bash
vue-health . --no-dead-code
```

---

### `--verbose`

**Description**: Show file details for each diagnostic

**Output**: Includes file paths and line numbers for each issue

**Example**:
```bash
vue-health . --verbose
```

**Sample output**:
```
 ✗ Mutating props directly (3)
    src/components/UserCard.vue:42
    src/views/Profile.vue:15
    src/components/Button.vue:8
```

---

### `--score`

**Description**: Output only the score (0-100)

**Use case**: CI/CD pipelines where you only need the numeric score

**Example**:
```bash
vue-health . --score
# Output: 87
```

---

### `-y, --yes`

**Description**: Skip prompts, scan all workspace projects

**Use case**: CI/CD or non-interactive environments

**Example**:
```bash
vue-health . --yes
```

**Note**: In CI environments (detected via `CI` or `CLAUDECODE` env vars), prompts are automatically skipped.

---

### `--project <names>`

**Description**: Select specific workspace projects (comma-separated)

**Type**: `string`
**Use case**: Monorepos with multiple projects

**Example**:
```bash
vue-health . --project app-a
vue-health . --project app-a,app-b,app-c
```

---

### `--diff [base]`

**Description**: Scan only files changed vs base branch

**Type**: `boolean | string`
**Default behavior**: Auto-detect base branch (typically `main` or `master`)
**With base branch**: Use specified branch as comparison

**Examples**:
```bash
vue-health . --diff           # Auto-detect base branch
vue-health . --diff main      # Compare vs main branch
vue-health . --diff develop   # Compare vs develop branch
```

**Behavior**:
- Only scans files that have changed compared to the base branch
- Useful for PR checks and incremental analysis
- Falls back to full scan if not on a feature branch

---

### `--deep`

**Description**: Use ESLint deep analysis instead of oxlint

**Trade-offs**:
- **Pros**: More rules, customizable via ESLint config
- **Cons**: Slower (JavaScript vs Rust)

**Example**:
```bash
vue-health . --deep
```

**With custom ESLint config** (in `.vue-healthrc`):
```json
{
  "deep": true,
  "eslint": {
    "configFile": "./.eslintrc.js"
  }
}
```

---

### `-h, --help`

**Description**: Display help for command

**Example**:
```bash
vue-health --help
```

---

## Option Precedence

CLI options override configuration file settings:

```
CLI flag > .vue-healthrc > default value
```

**Example**:
```bash
# .vue-healthrc has { "lint": false }
vue-health . --lint    # lint is ENABLED (CLI flag wins)
```

The `isCliOverride()` check in the code determines if an option was explicitly set via CLI.

---

## Environment Detection

vue-health automatically detects:

1. **Vue framework** (Nuxt, Vite, Vue CLI, Quasar)
2. **TypeScript** (via `tsconfig.json`)
3. **Vue version** (from `package.json`)
4. **CI/CD environments** (via `CI`, `CLAUDECODE`, `CURSOR_AGENT`, `CODEX_CI` env vars)

In CI/CD environments:
- Interactive prompts are automatically skipped
- Output is optimized for non-TTY consumption

---

<a name="中文"></a>
## 中文

vue-health CLI 选项完整参考。

---

## 语法

```bash
vue-health [目录] [选项]
```

---

## 参数

### `[目录]`

**类型**: `string`
**默认**: `"."`（当前目录）
**描述**: 要扫描的 Vue 项目目录路径

**示例**：
```bash
vue-health .                    # 扫描当前目录
vue-health ./my-app             # 扫描特定目录
vue-health ../packages/app-a    # 扫描相对路径
```

---

## 选项

### `-v, --version`

**描述**：显示版本号

**示例**：
```bash
vue-health --version
# 输出: 2.0.0
```

---

### `--no-lint`

**描述**：跳过 lint 检查

**使用场景**：仅需要死代码检测时加快扫描

**示例**：
```bash
vue-health . --no-lint
```

---

### `--no-dead-code`

**描述**：跳过死代码检测（knip）

**使用场景**：仅需要 lint 时加快扫描

**示例**：
```bash
vue-health . --no-dead-code
```

---

### `--verbose`

**描述**：显示每条诊断的文件详情

**输出**：包含每个问题的文件路径和行号

**示例**：
```bash
vue-health . --verbose
```

**示例输出**：
```
 ✗ Mutating props directly (3)
    src/components/UserCard.vue:42
    src/views/Profile.vue:15
    src/components/Button.vue:8
```

---

### `--score`

**描述**：仅输出分数（0-100）

**使用场景**：仅需要数值分数的 CI/CD 流水线

**示例**：
```bash
vue-health . --score
# 输出: 87
```

---

### `-y, --yes`

**描述**：跳过提示，扫描所有 workspace 项目

**使用场景**：CI/CD 或非交互式环境

**示例**：
```bash
vue-health . --yes
```

**注意**：在 CI 环境中（通过 `CI` 或 `CLAUDECODE` 环境变量检测），提示会自动跳过。

---

### `--project <names>`

**描述**：指定特定 workspace 项目（逗号分隔）

**类型**：`string`
**使用场景**：包含多个项目的 monorepo

**示例**：
```bash
vue-health . --project app-a
vue-health . --project app-a,app-b,app-c
```

---

### `--diff [base]`

**描述**：仅扫描相对于 base 分支变更的文件

**类型**：`boolean | string`
**默认行为**：自动检测 base 分支（通常是 `main` 或 `master`）
**指定 base 分支**：使用指定的分支作为比较

**示例**：
```bash
vue-health . --diff           # 自动检测 base 分支
vue-health . --diff main      # 与 main 分支比较
vue-health . --diff develop   # 与 develop 分支比较
```

**行为**：
- 仅扫描与 base 分支相比变更的文件
- 适用于 PR 检查和增量分析
- 如果不在特性分支上则回退到完整扫描

---

### `--deep`

**描述**：使用 ESLint 深度分析替代 oxlint

**权衡**：
- **优点**：更多规则，可通过 ESLint 配置自定义
- **缺点**：更慢（JavaScript vs Rust）

**示例**：
```bash
vue-health . --deep
```

**使用自定义 ESLint 配置**（在 `.vue-healthrc` 中）：
```json
{
  "deep": true,
  "eslint": {
    "configFile": "./.eslintrc.js"
  }
}
```

---

### `-h, --help`

**描述**：显示命令帮助

**示例**：
```bash
vue-health --help
```

---

## 选项优先级

CLI 选项覆盖配置文件设置：

```
CLI 标志 > .vue-healthrc > 默认值
```

**示例**：
```bash
# .vue-healthrc 有 { "lint": false }
vue-health . --lint    # lint 已启用（CLI 标志获胜）
```

代码中的 `isCliOverride()` 检查确定选项是否通过 CLI 显式设置。

---

## 环境检测

vue-health 自动检测：

1. **Vue 框架**（Nuxt、Vite、Vue CLI、Quasar）
2. **TypeScript**（通过 `tsconfig.json`）
3. **Vue 版本**（从 `package.json`）
4. **CI/CD 环境**（通过 `CI`、`CLAUDECODE`、`CURSOR_AGENT`、`CODEX_CI` 环境变量）

在 CI/CD 环境中：
- 交互式提示自动跳过
- 输出针对非 TTY 消费进行了优化
