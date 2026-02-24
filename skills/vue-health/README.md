# vue-health Skill for Claude Code

[English](#english) | [中文](#中文)

---

<a name="english"></a>
## English

The **vue-health** skill enables Claude Code to automatically diagnose Vue.js codebase health. It runs comprehensive checks for linting issues, dead code, and best practice violations, providing a 0-100 health score with actionable fixes.

---

## Features

- **40+ Vue.js diagnostic rules** — Correctness, performance, security, dead code
- **Zero configuration** — Auto-detects Nuxt / Vite / Vue CLI / Quasar
- **Fast** — Powered by [oxlint](https://oxc.rs) (Rust-based linter)
- **Health scoring** — 0-100 score with actionable improvement suggestions
- **Dead code detection** — Unused files, exports, components via [knip](https://knip.dev)
- **Bilingual support** — English and Chinese

---

## Installation

### Option 1: Project-Local (Recommended for Development)

Clone or copy this skill into your project's `.claude/skills/` directory:

```bash
# In your Vue project root
mkdir -p .claude/skills
cp -r path/to/vue-health/skills/vue-health .claude/skills/
```

### Option 2: User-Global (Recommended for Claude Code)

```bash
# Create global skills directory
mkdir -p ~/.claude/skills/

# Copy the skill
cp -r /Users/zhangyuting/github/zhyt1985/vue-health/skills/vue-health ~/.claude/skills/

# Or clone directly
git clone https://github.com/zhyt1985/vue-health.git ~/vue-health
cp -r ~/vue-health/skills/vue-health ~/.claude/skills/
```

### Option 3: Install from npm package

```bash
# Install vue-health globally
npm install -g vue-health

# The skill will be available via the installed package
# Add to ~/.claude/skills/ if needed
```

---

## Quick Start

### In Claude Code

Simply ask Claude to check your Vue project health:

```
Check the health of this Vue project
```

```
Run vue-health on the current directory
```

```
Analyze Vue code quality
```

**Chinese prompts** (中文提示):
```
检查这个 Vue 项目的健康度
```

```
在当前目录运行 vue-health
```

```
分析 Vue 代码质量
```

---

## Usage Examples

### Basic Health Check

```
User: Check Vue project health

Claude: I'll run vue-health to check your Vue project's health.
[runs npx vue-health .]
```

### Verbose Output

```
User: Run vue-health with verbose output

Claude: I'll run vue-health with verbose mode to show file details.
[runs npx vue-health . --verbose]
```

### Score Only (CI/CD)

```
User: Get the health score only

Claude: I'll run vue-health to get just the score.
[runs npx vue-health . --score]
```

### Diff Mode (PR Checks)

```
User: Check only changed files vs main

Claude: I'll run vue-health in diff mode to scan only changed files.
[runs npx vue-health . --diff main]
```

---

## Trigger Phrases

### English
- "Check Vue project health"
- "Analyze Vue code quality"
- "Run vue-health"
- "Vue health check"
- "Diagnose Vue codebase"
- "Find Vue issues"
- "Vue code review"
- "Check for dead code in Vue"

### Chinese (中文)
- "检查 Vue 项目健康度"
- "分析 Vue 代码质量"
- "运行 vue-health"
- "Vue 健康检查"
- "诊断 Vue 代码库"
- "查找 Vue 问题"
- "Vue 代码审查"
- "检查 Vue 死代码"

---

## Configuration

The skill respects `.vue-healthrc` configuration files in your project root. See [Configuration Guide](references/configuration.md) for details.

Example `.vue-healthrc`:

```json
{
  "lint": true,
  "deadCode": true,
  "verbose": false,
  "ignore": {
    "rules": ["no-v-html"],
    "files": ["src/legacy/**"]
  }
}
```

---

## CLI Options

| Option | Description |
|--------|-------------|
| `--no-lint` | Skip linting checks |
| `--no-dead-code` | Skip dead code detection |
| `--verbose` | Show file details per diagnostic |
| `--score` | Output only the score (0-100) |
| `--diff [base]` | Scan only changed files vs base branch |
| `--deep` | Use ESLint deep analysis instead of oxlint |

See [CLI Options Reference](references/cli-options.md) for complete documentation.

---

## Sample Output

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

---

## Requirements

- **Node.js** >= 20
- **Vue** 2.7+ or Vue 3.x project
- Supported frameworks: Nuxt, Vite, Vue CLI, Quasar

---

## Troubleshooting

### "Not a Vue project" error

Ensure you're in a Vue project directory with `package.json` containing Vue dependencies.

### Skill not discovered

Verify the skill is in the correct location:
- Project-local: `.claude/skills/vue-health/`
- Global: `~/.claude/skills/vue-health/`

### oxlint not found

Run with `--deep` flag to use ESLint instead, or ensure Node.js >= 20.

---

## Documentation

- [Diagnostic Rules](references/diagnostic-rules.md) — Complete list of 40+ rules
- [Scoring Algorithm](references/scoring.md) — How scores are calculated
- [Configuration Guide](references/configuration.md) — Advanced `.vue-healthrc` options
- [API Reference](references/api.md) — Programmatic API documentation
- [CLI Options](references/cli-options.md) — Detailed CLI flag reference
- [CI/CD Integration](references/integration.md) — CI/CD examples

---

## Links

- **GitHub**: https://github.com/zhyt1985/vue-health
- **npm**: https://www.npmjs.com/package/vue-health
- **CLI**: `npx vue-health`

---

<a name="中文"></a>
## 中文

**vue-health** skill 使 Claude Code 能够自动诊断 Vue.js 代码库健康状况。它运行全面的检查，包括代码规范问题、死代码和最佳实践违规，提供 0-100 健康分数和可操作的修复建议。

---

## 特性

- **40+ Vue.js 诊断规则** — 正确性、性能、安全、死代码
- **零配置** — 自动检测 Nuxt / Vite / Vue CLI / Quasar
- **极速** — 由 [oxlint](https://oxc.rs)（基于 Rust 的 linter）驱动
- **健康评分** — 0-100 分数及可操作的改进建议
- **死代码检测** — 通过 [knip](https://knip.dev) 检测未使用的文件、导出、组件
- **双语支持** — 中英文

---

## 安装

### 方式 1：项目本地（推荐用于开发）

将此 skill 克隆或复制到项目的 `.claude/skills/` 目录：

```bash
# 在 Vue 项目根目录
mkdir -p .claude/skills
cp -r path/to/vue-health/skills/vue-health .claude/skills/
```

### 方式 2：用户全局（推荐用于 Claude Code）

```bash
# 创建全局 skills 目录
mkdir -p ~/.claude/skills/

# 复制 skill
cp -r /Users/zhangyuting/github/zhyt1985/vue-health/skills/vue-health ~/.claude/skills/

# 或直接克隆
git clone https://github.com/zhyt1985/vue-health.git ~/vue-health
cp -r ~/vue-health/skills/vue-health ~/.claude/skills/
```

### 方式 3：从 npm 包安装

```bash
# 全局安装 vue-health
npm install -g vue-health

# skill 将通过已安装的包可用
# 如需要，添加到 ~/.claude/skills/
```

---

## 快速开始

### 在 Claude Code 中

只需让 Claude 检查 Vue 项目的健康状况：

```
Check the health of this Vue project
```

```
Run vue-health on the current directory
```

```
Analyze Vue code quality
```

**中文提示**：
```
检查这个 Vue 项目的健康度
```

```
在当前目录运行 vue-health
```

```
分析 Vue 代码质量
```

---

## 使用示例

### 基本健康检查

```
用户: 检查 Vue 项目健康度

Claude: 我将运行 vue-health 检查 Vue 项目的健康状况。
[运行 npx vue-health .]
```

### 详细输出

```
用户: 运行 vue-health 并显示详细输出

Claude: 我将以详细模式运行 vue-health 以显示文件详情。
[运行 npx vue-health . --verbose]
```

### 仅分数（CI/CD）

```
用户: 只获取健康分数

Claude: 我将运行 vue-health 仅获取分数。
[运行 npx vue-health . --score]
```

### Diff 模式（PR 检查）

```
用户: 仅检查相对于 main 的变更文件

Claude: 我将以 diff 模式运行 vue-health 仅扫描变更文件。
[运行 npx vue-health . --diff main]
```

---

## 触发词

### 中文
- "检查 Vue 项目健康度"
- "分析 Vue 代码质量"
- "运行 vue-health"
- "Vue 健康检查"
- "诊断 Vue 代码库"
- "查找 Vue 问题"
- "Vue 代码审查"
- "检查 Vue 死代码"

### English
- "Check Vue project health"
- "Analyze Vue code quality"
- "Run vue-health"
- "Vue health check"
- "Diagnose Vue codebase"
- "Find Vue issues"
- "Vue code review"
- "Check for dead code in Vue"

---

## 配置

Skill 遵守项目根目录中的 `.vue-healthrc` 配置文件。详见 [配置指南](references/configuration.md)。

示例 `.vue-healthrc`：

```json
{
  "lint": true,
  "deadCode": true,
  "verbose": false,
  "ignore": {
    "rules": ["no-v-html"],
    "files": ["src/legacy/**"]
  }
}
```

---

## CLI 选项

| 选项 | 描述 |
|------|------|
| `--no-lint` | 跳过 lint 检查 |
| `--no-dead-code` | 跳过死代码检测 |
| `--verbose` | 显示每条诊断的文件详情 |
| `--score` | 仅输出分数（0-100）|
| `--diff [base]` | 仅扫描相对于 base 分支的变更文件 |
| `--deep` | 使用 ESLint 深度分析替代 oxlint |

完整文档请参阅 [CLI 选项参考](references/cli-options.md)。

---

## 示例输出

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

---

## 要求

- **Node.js** >= 20
- **Vue** 2.7+ 或 Vue 3.x 项目
- 支持的框架：Nuxt、Vite、Vue CLI、Quasar

---

## 故障排除

### "不是 Vue 项目"错误

确保你在包含 Vue 依赖的 `package.json` 的 Vue 项目目录中。

### Skill 未被发现

验证 skill 在正确位置：
- 项目本地：`.claude/skills/vue-health/`
- 全局：`~/.claude/skills/vue-health/`

### 找不到 oxlint

使用 `--deep` 标志改用 ESLint，或确保 Node.js >= 20。

---

## 文档

- [诊断规则](references/diagnostic-rules.md) — 40+ 规则的完整列表
- [评分算法](references/scoring.md) — 分数如何计算
- [配置指南](references/configuration.md) — 高级 `.vue-healthrc` 选项
- [API 参考](references/api.md) — 编程 API 文档
- [CLI 选项](references/cli-options.md) — 详细的 CLI 标志参考
- [CI/CD 集成](references/integration.md) — CI/CD 示例

---

## 链接

- **GitHub**: https://github.com/zhyt1985/vue-health
- **npm**: https://www.npmjs.com/package/vue-health
- **CLI**: `npx vue-health`
