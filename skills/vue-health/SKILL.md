---
name: vue-health-check
description: |
  Run comprehensive Vue.js codebase health diagnostics. Detects linting issues, dead code, and best practice violations. Provides 0-100 health score with actionable fixes.

  运行 Vue.js 代码库健康诊断。检测代码规范问题、死代码和最佳实践违规。提供 0-100 健康分数和可操作的修复建议。

  Triggers: "check Vue project health", "analyze Vue code quality", "run vue-health", "Vue health check", "diagnose Vue codebase", "find Vue issues", "Vue code review", "check for dead code in Vue"
  触发词: "检查 Vue 项目健康度", "分析 Vue 代码质量", "运行 vue-health", "Vue 健康检查", "诊断 Vue 代码库", "查找 Vue 问题", "Vue 代码审查", "检查 Vue 死代码"
license: MIT
metadata:
  author: zhyt1985 <https://github.com/zhyt1985>
  version: "2.0.0"
  project: https://github.com/zhyt1985/vue-health
  cli: "npx vue-health"
compatibility: |
  Requires Vue 2.7+ or Vue 3.x project, Node.js >= 20
  需要 Vue 2.7+ 或 Vue 3.x 项目, Node.js >= 20
---

# vue-health-check

[English](#english) | [中文](#中文)

---

<a name="english"></a>
## English

### Overview / 概述

**vue-health** is a comprehensive diagnostic tool for Vue.js codebases. It runs health checks that detect:

- **Linting issues** — 40+ Vue.js best practice violations (correctness, performance, security)
- **Dead code** — Unused files, exports, components, and types
- **Health score** — 0-100 score with actionable improvement suggestions

Powered by [oxlint](https://oxc.rs) (Rust-based linter) and [knip](https://knip.dev) (dead code detector), vue-health is fast, zero-config, and works with all major Vue frameworks (Nuxt, Vite, Vue CLI, Quasar).

### When to Apply / 何时使用

Apply this skill when:

- Working in a Vue.js project directory (detected automatically)
- 用户在 Vue.js 项目目录中工作（自动检测）
- Before committing code — catch issues early
- 提交代码前 — 提前发现问题
- After refactoring — verify no dead code was introduced
- 重构后 — 验证没有引入死代码
- In CI/CD pipelines — ensure code quality standards
- 在 CI/CD 流水线中 — 确保代码质量标准
- When reviewing pull requests — quick quality assessment
- 审查 PR 时 — 快速质量评估

**Prerequisites**:
- Current directory must contain a Vue.js project (Nuxt, Vite, Vue CLI, or Quasar)
- Node.js >= 20 installed

### Quick Start / 快速开始

#### Option 1: Direct invocation (no install)

```bash
npx vue-health .
```

#### Option 2: Install globally

```bash
npm i -g vue-health
vue-health .
```

#### Option 3: Programmatic API

```typescript
import { diagnose } from "vue-health/api";

const { diagnostics, score } = await diagnose("./my-vue-app");
console.log(`Health Score: ${score.score}/100 (${score.label})`);
```

### CLI Usage / CLI 使用

#### Basic syntax

```bash
vue-health [directory] [options]
```

#### Options table / 选项表

| Option | Short | Description | Chinese |
|--------|-------|-------------|---------|
| `[directory]` | - | Project directory to scan (default: `.`) | 要扫描的项目目录（默认 `.`）|
| `--no-lint` | - | Skip linting checks | 跳过 lint 检查 |
| `--no-dead-code` | - | Skip dead code detection | 跳过死代码检测 |
| `--verbose` | - | Show file details for each diagnostic | 显示每条诊断的文件详情 |
| `--score` | - | Output only the score (0-100) | 仅输出分数（0-100）|
| `-y, --yes` | - | Skip prompts, scan all workspace projects | 跳过提示，扫描所有 workspace 项目 |
| `--project <names>` | - | Select specific workspace projects (comma-separated) | 指定 workspace 项目（逗号分隔）|
| `--diff [base]` | - | Scan only files changed vs base branch | 仅扫描相对于 base 分支变更的文件 |
| `--deep` | - | Use ESLint deep analysis instead of oxlint | 使用 ESLint 深度分析替代 oxlint |
| `-v, --version` | - | Display version number | 显示版本号 |
| `-h, --help` | - | Display help | 显示帮助 |

#### Examples / 示例

```bash
# Scan current directory
vue-health .

# Only show the score (useful for CI)
vue-health . --score

# Scan only changed files vs main branch
vue-health . --diff main

# Verbose output with file locations
vue-health . --verbose

# Skip dead code detection
vue-health . --no-dead-code

# Scan specific project in monorepo
vue-health . --project my-app

# Use ESLint deep analysis
vue-health . --deep
```

### API Usage / API 使用

#### TypeScript API

```typescript
import { diagnose, type Diagnostic, type ScanOptions, type ScoreResult } from "vue-health/api";

// Basic usage
const { diagnostics, score } = await diagnose("./my-vue-app");

console.log(score);
// { score: 87, label: "Good" }

console.log(diagnostics[0]);
// {
//   filePath: "src/components/Foo.vue",
//   plugin: "vue",
//   rule: "no-mutating-props",
//   severity: "error",
//   message: "Mutating props directly",
//   help: "Use emit('update:propName', newValue) or a local data copy",
//   category: "Correctness",
//   line: 42,
//   column: 5
// }

// With options
const { diagnostics, score } = await diagnose("./my-vue-app", {
  lint: true,           // Enable/disable linting (default: true)
  deadCode: true,       // Enable/disable dead code detection (default: true)
  verbose: false,       // Show file details (default: false)
  deep: false,          // Use ESLint deep analysis (default: false)
  includePaths: ["src/components/**"], // Only scan specific paths
});
```

#### API Types / API 类型

```typescript
interface Diagnostic {
  filePath: string;
  plugin: string;       // "vue", "typescript", etc.
  rule: string;         // Rule ID, e.g., "no-mutating-props"
  severity: "error" | "warning";
  message: string;
  help: string;
  line: number;
  column: number;
  category: string;     // "Correctness", "Performance", "Security", "Dead Code"
}

interface ScoreResult {
  score: number;        // 0-100
  label: string;        // "Good", "OK", "Needs Work"
}

interface ScanOptions {
  lint?: boolean;
  deadCode?: boolean;
  verbose?: boolean;
  deep?: boolean;
  includePaths?: string[];
}

interface DiagnoseResult {
  diagnostics: Diagnostic[];
  score: ScoreResult;
}
```

### Understanding Output / 理解输出

#### Sample output / 示例输出

```
vue-health v2.0.0

  Nuxt (Vue ^3.5.0) · 128 source files

✔ Found 12 lint issues
✔ Found 3 dead code issues

 ✗ Mutating props directly
    Use `emit('update:propName', newValue)` or a local data copy

 ⚠ Unused component (3)
    Remove the unused component import or use it in the template

 ⚠ Using v-if with v-for (2)
    Move v-if to a wrapper element or use computed to filter the list

────────────────────────────────────────

  ( ◕‿◕)  Vue Doctor — my-app

  Score: 87/100 Good
  ███████████████████████████████████████████░░░░░░░

  Framework: Nuxt · Vue: ^3.5.0 · Issues: 15 · Time: 1.2s
```

#### Score interpretation / 分数解读

| Score | Label | Meaning | Emoji |
|-------|-------|---------|-------|
| 75-100 | Good | Healthy codebase, minor issues | `( ◕‿◕)` |
| 50-74 | OK | Acceptable quality, some improvements needed | `( ◑‿◑)` |
| 0-49 | Needs Work | Significant issues require attention | `( ◉_◉)` |

**Scoring algorithm**:
- Base score: 100
- Error penalty: -3 points per error (capped per rule)
- Warning penalty: -1 point per warning (capped per rule)
- Final score: max(0, base_score - total_penalty)

### Configuration / 配置

Create `.vue-healthrc` or `.vue-healthrc.json` in your project root:

```json
{
  "$schema": "https://raw.githubusercontent.com/zhyt1985/vue-health/main/schema.json",
  "lint": true,
  "deadCode": true,
  "verbose": false,
  "diff": false,
  "ignore": {
    "rules": ["no-v-html"],
    "files": ["src/legacy/**", "vendor/**"]
  },
  "eslint": {
    "configFile": "./.eslintrc.js"
  }
}
```

#### Configuration options / 配置选项

| Option | Type | Description | Chinese |
|--------|------|-------------|---------|
| `lint` | boolean | Enable/disable linting (default: `true`) | 启用/禁用 lint（默认 `true`）|
| `deadCode` | boolean | Enable/disable dead code detection (default: `true`) | 启用/禁用死代码检测（默认 `true`）|
| `verbose` | boolean | Show file details (default: `false`) | 显示文件详情（默认 `false`）|
| `diff` | boolean\|string | Scan changed files only (default: `false`) | 仅扫描变更文件（默认 `false`）|
| `ignore.rules` | string[] | Rules to ignore | 要忽略的规则 |
| `ignore.files` | string[] | File patterns to ignore | 要忽略的文件模式 |
| `eslint.configFile` | string | Path to ESLint config (for `--deep` mode) | ESLint 配置路径（用于 `--deep` 模式）|

### Core Diagnostic Rules / 核心诊断规则

#### Correctness / 正确性
- `no-mutating-props` — Don't mutate props directly
- `no-ref-as-operand` — Use `.value` to access refs in script
- `no-setup-props-reactivity-loss` — Maintain reactivity when destructuring props
- `no-side-effects-in-computed-properties` — Computed properties should be pure
- `require-v-for-key` — `:key` is required on v-for elements
- `valid-v-model` — v-model needs a writable expression
- ... 30+ more correctness rules

#### Performance / 性能
- `no-use-v-if-with-v-for` — Don't use v-if and v-for on the same element

#### Security / 安全
- `no-v-html` — `v-html` can lead to XSS — sanitize or use interpolation

#### Dead Code / 死代码 (via knip)
- Unused files — Files not imported anywhere
- Unused exports/types — Exported symbols never consumed
- Unused dependencies — Dependencies not referenced in code
- Unused components — Remove unused component imports

For a complete list of 40+ rules, see [references/diagnostic-rules.md](references/diagnostic-rules.md).

### Troubleshooting / 故障排除

#### "Not a Vue project" error
**Cause**: No Vue framework detected in current directory.
**Solution**: Ensure you're in a Vue project directory with `package.json` containing Vue dependencies.

#### "oxlint not found" error
**Cause**: oxlint binary not available.
**Solution**: Run with `--deep` flag to use ESLint instead, or ensure Node.js >= 20.

#### Dead code detection is slow
**Cause**: Large codebase or many dependencies.
**Solution**: Use `--no-dead-code` to skip knip, or create `.vue-healthrc` with `"deadCode": false`.

#### CI integration fails
**Cause**: Interactive prompts in non-TTY environment.
**Solution**: Use `-y` flag or `CLAUDECODE=1` environment variable (auto-detected).

### See Also / 参考文档

- [Diagnostic Rules Reference](references/diagnostic-rules.md) — Complete list of 40+ rules
- [Scoring Algorithm](references/scoring.md) — How scores are calculated
- [Configuration Guide](references/configuration.md) — Advanced `.vue-healthrc` options
- [API Reference](references/api.md) — Full programmatic API documentation
- [CLI Options](references/cli-options.md) — Detailed CLI flag reference
- [CI/CD Integration](references/integration.md) — GitHub Actions, GitLab CI, npm scripts examples

---

<a name="中文"></a>
## 中文

### 概述

**vue-health** 是 Vue.js 代码库的综合诊断工具。它执行健康检查，检测：

- **代码规范问题** — 40+ Vue.js 最佳实践违规（正确性、性能、安全）
- **死代码** — 未使用的文件、导出、组件和类型
- **健康评分** — 0-100 分数及可操作的改进建议

由 [oxlint](https://oxc.rs)（基于 Rust 的 linter）和 [knip](https://knip.dev)（死代码检测器）驱动，vue-health 快速、零配置，适用于所有主流 Vue 框架（Nuxt、Vite、Vue CLI、Quasar）。

### 何时使用

在以下情况应用此技能：

- 在 Vue.js 项目目录中工作（自动检测）
- 提交代码前 — 提前发现问题
- 重构后 — 验证没有引入死代码
- 在 CI/CD 流水线中 — 确保代码质量标准
- 审查 PR 时 — 快速质量评估

**前置条件**：
- 当前目录必须包含 Vue.js 项目（Nuxt、Vite、Vue CLI 或 Quasar）
- 已安装 Node.js >= 20

### 快速开始

#### 方式 1：直接调用（无需安装）

```bash
npx vue-health .
```

#### 方式 2：全局安装

```bash
npm i -g vue-health
vue-health .
```

#### 方式 3：编程 API

```typescript
import { diagnose } from "vue-health/api";

const { diagnostics, score } = await diagnose("./my-vue-app");
console.log(`健康分数: ${score.score}/100 (${score.label})`);
```

### CLI 使用

#### 基本语法

```bash
vue-health [目录] [选项]
```

#### 选项表

| 选项 | 简写 | 说明 |
|------|------|------|
| `[目录]` | - | 要扫描的项目目录（默认 `.`）|
| `--no-lint` | - | 跳过 lint 检查 |
| `--no-dead-code` | - | 跳过死代码检测 |
| `--verbose` | - | 显示每条诊断的文件详情 |
| `--score` | - | 仅输出分数（0-100）|
| `-y, --yes` | - | 跳过提示，扫描所有 workspace 项目 |
| `--project <names>` | - | 指定 workspace 项目（逗号分隔）|
| `--diff [base]` | - | 仅扫描相对于 base 分支变更的文件 |
| `--deep` | - | 使用 ESLint 深度分析替代 oxlint |
| `-v, --version` | - | 显示版本号 |
| `-h, --help` | - | 显示帮助 |

#### 示例

```bash
# 扫描当前目录
vue-health .

# 仅显示分数（适合 CI）
vue-health . --score

# 仅扫描相对于 main 分支的变更文件
vue-health . --diff main

# 详细输出，包含文件位置
vue-health . --verbose

# 跳过死代码检测
vue-health . --no-dead-code

# 扫描 monorepo 中的特定项目
vue-health . --project my-app

# 使用 ESLint 深度分析
vue-health . --deep
```

### API 使用

#### TypeScript API

```typescript
import { diagnose, type Diagnostic, type ScanOptions, type ScoreResult } from "vue-health/api";

// 基本用法
const { diagnostics, score } = await diagnose("./my-vue-app");

console.log(score);
// { score: 87, label: "Good" }

console.log(diagnostics[0]);
// {
//   filePath: "src/components/Foo.vue",
//   plugin: "vue",
//   rule: "no-mutating-props",
//   severity: "error",
//   message: "Mutating props directly",
//   help: "Use emit('update:propName', newValue) or a local data copy",
//   category: "Correctness",
//   line: 42,
//   column: 5
// }

// 带选项
const { diagnostics, score } = await diagnose("./my-vue-app", {
  lint: true,           // 启用/禁用 lint（默认: true）
  deadCode: true,       // 启用/禁用死代码检测（默认: true）
  verbose: false,       // 显示文件详情（默认: false）
  deep: false,          // 使用 ESLint 深度分析（默认: false）
  includePaths: ["src/components/**"], // 仅扫描特定路径
});
```

### 理解输出

#### 示例输出

```
vue-health v2.0.0

  Nuxt (Vue ^3.5.0) · 128 source files

✔ Found 12 lint issues
✔ Found 3 dead code issues

 ✗ Mutating props directly
    Use `emit('update:propName', newValue)` or a local data copy

 ⚠ Unused component (3)
    Remove the unused component import or use it in the template

 ⚠ Using v-if with v-for (2)
    Move v-if to a wrapper element or use computed to filter the list

────────────────────────────────────────

  ( ◕‿◕)  Vue Doctor — my-app

  Score: 87/100 Good
  ███████████████████████████████████████████░░░░░░░

  Framework: Nuxt · Vue: ^3.5.0 · Issues: 15 · Time: 1.2s
```

#### 分数解读

| 分数 | 等级 | 含义 | 表情 |
|------|------|------|------|
| 75-100 | Good | 健康的代码库，少量问题 | `( ◕‿◕)` |
| 50-74 | OK | 可接受的质量，需要一些改进 | `( ◑‿◑)` |
| 0-49 | Needs Work | 存在重大问题需要关注 | `( ◉_◉)` |

**评分算法**：
- 基础分数：100
- 错误惩罚：每条错误 -3 分（每规则有上限）
- 警告惩罚：每条警告 -1 分（每规则有上限）
- 最终分数：max(0, 基础分数 - 总惩罚)

### 配置

在项目根目录创建 `.vue-healthrc` 或 `.vue-healthrc.json`：

```json
{
  "$schema": "https://raw.githubusercontent.com/zhyt1985/vue-health/main/schema.json",
  "lint": true,
  "deadCode": true,
  "verbose": false,
  "diff": false,
  "ignore": {
    "rules": ["no-v-html"],
    "files": ["src/legacy/**", "vendor/**"]
  },
  "eslint": {
    "configFile": "./.eslintrc.js"
  }
}
```

### 核心诊断规则

#### 正确性
- `no-mutating-props` — 禁止直接修改 props
- `no-ref-as-operand` — 在 script 中使用 `.value` 访问 ref
- `no-setup-props-reactivity-loss` — 解构 props 时保持响应性
- `no-side-effects-in-computed-properties` — 计算属性应为纯函数
- `require-v-for-key` — v-for 元素必须绑定 `:key`
- `valid-v-model` — v-model 需要可写的表达式
- ... 30+ 更多正确性规则

#### 性能
- `no-use-v-if-with-v-for` — 禁止在同一元素上同时使用 v-if 和 v-for

#### 安全
- `no-v-html` — `v-html` 可能导致 XSS，应使用文本插值或对内容进行消毒

#### 死代码（via knip）
- 未使用的文件 — 未被任何文件导入的文件
- 未使用的导出/类型 — 导出了但从未被消费的符号
- 未使用的依赖 — 代码中未引用的依赖
- 未使用的组件 — 移除未使用的组件导入

完整的 40+ 规则列表，参见 [references/diagnostic-rules.md](references/diagnostic-rules.md)。

### 故障排除

#### "不是 Vue 项目"错误
**原因**：当前目录未检测到 Vue 框架。
**解决**：确保你在包含 Vue 依赖的 `package.json` 的 Vue 项目目录中。

#### "找不到 oxlint"错误
**原因**：oxlint 二进制文件不可用。
**解决**：使用 `--deep` 标志改用 ESLint，或确保 Node.js >= 20。

#### 死代码检测很慢
**原因**：大型代码库或许多依赖。
**解决**：使用 `--no-dead-code` 跳过 knip，或创建 `"deadCode": false` 的 `.vue-healthrc`。

#### CI 集成失败
**原因**：非 TTY 环境中的交互式提示。
**解决**：使用 `-y` 标志或 `CLAUDECODE=1` 环境变量（自动检测）。

### 参考文档

- [诊断规则参考](references/diagnostic-rules.md) — 40+ 规则的完整列表
- [评分算法](references/scoring.md) — 分数如何计算
- [配置指南](references/configuration.md) — 高级 `.vue-healthrc` 选项
- [API 参考](references/api.md) — 完整的编程 API 文档
- [CLI 选项](references/cli-options.md) — 详细的 CLI 标志参考
- [CI/CD 集成](references/integration.md) — GitHub Actions、GitLab CI、npm 脚本示例
