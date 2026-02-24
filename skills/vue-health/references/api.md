# API Reference

[English](#english) | [中文](#中文)

---

<a name="english"></a>
## English

The vue-health programmatic API allows you to run diagnostics from your own code.

---

## Installation

```bash
npm install vue-health
```

---

## Main Function: `diagnose()`

### Signature

```typescript
function diagnose(
  directory: string,
  options?: ScanOptions
): Promise<DiagnoseResult>
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `directory` | `string` | Yes | Absolute or relative path to the Vue project directory |
| `options` | `ScanOptions` | No | Configuration options (see below) |

### Return Type

```typescript
interface DiagnoseResult {
  diagnostics: Diagnostic[];
  score: ScoreResult;
}
```

---

## Types Reference

### ScanOptions

```typescript
interface ScanOptions {
  /** Enable/disable linting checks (default: true) */
  lint?: boolean;

  /** Enable/disable dead code detection (default: true) */
  deadCode?: boolean;

  /** Show file details for each diagnostic (default: false) */
  verbose?: boolean;

  /** Use ESLint deep analysis instead of oxlint (default: false) */
  deep?: boolean;

  /** Only scan specific file paths (glob patterns supported) */
  includePaths?: string[];
}
```

### Diagnostic

```typescript
interface Diagnostic {
  /** Absolute path to the file with the issue */
  filePath: string;

  /** Plugin name (e.g., "vue", "typescript", "knip") */
  plugin: string;

  /** Rule ID (e.g., "no-mutating-props", "no-unused-vars") */
  rule: string;

  /** Severity level */
  severity: "error" | "warning";

  /** Human-readable issue description */
  message: string;

  /** Suggested fix or explanation */
  help: string;

  /** Line number (1-based) */
  line: number;

  /** Column number (1-based) */
  column: number;

  /** Category: "Correctness", "Performance", "Security", or "Dead Code" */
  category: string;

  /** Internal weight for scoring (usually 3 for error, 1 for warning) */
  weight?: number;
}
```

### ScoreResult

```typescript
interface ScoreResult {
  /** Health score from 0 to 100 */
  score: number;

  /** Label: "Good", "OK", or "Needs Work" */
  label: string;
}
```

### ProjectInfo

```typescript
interface ProjectInfo {
  /** Absolute path to project root */
  rootDirectory: string;

  /** Project name from package.json */
  projectName: string;

  /** Vue version (e.g., "^3.5.0") or null if not detected */
  vueVersion: string | null;

  /** Detected framework: "nuxt", "vite", "vue-cli", "quasar", or "unknown" */
  framework: Framework;

  /** Whether TypeScript is detected */
  hasTypeScript: boolean;

  /** Number of source files scanned */
  sourceFileCount: number;
}

type Framework = "nuxt" | "vite" | "vue-cli" | "quasar" | "unknown";
```

---

## Usage Examples

### Basic Usage

```typescript
import { diagnose } from "vue-health/api";

const { diagnostics, score } = await diagnose("./my-vue-app");

console.log(`Health Score: ${score.score}/100 (${score.label})`);

for (const d of diagnostics) {
  console.log(`[${d.severity}] ${d.message}`);
  console.log(`  at ${d.filePath}:${d.line}:${d.column}`);
  if (d.help) {
    console.log(`  hint: ${d.help}`);
  }
}
```

### With Options

```typescript
import { diagnose } from "vue-health/api";

const { diagnostics, score } = await diagnose("./my-vue-app", {
  lint: true,
  deadCode: true,
  verbose: true,
  deep: false,
});
```

### Filter by Severity

```typescript
import { diagnose } from "vue-health/api";

const { diagnostics } = await diagnose("./my-vue-app");

const errors = diagnostics.filter(d => d.severity === "error");
const warnings = diagnostics.filter(d => d.severity === "warning");

console.log(`Found ${errors.length} errors and ${warnings.length} warnings`);
```

### Group by Category

```typescript
import { diagnose } from "vue-health/api";

const { diagnostics } = await diagnose("./my-vue-app");

const byCategory = diagnostics.reduce((acc, d) => {
  if (!acc[d.category]) acc[d.category] = [];
  acc[d.category].push(d);
  return acc;
}, {} as Record<string, typeof diagnostics>);

for (const [category, items] of Object.entries(byCategory)) {
  console.log(`${category}: ${items.length} issues`);
}
```

### CI/CD Usage

```typescript
import { diagnose } from "vue-health/api";

const { score } = await diagnose(process.cwd(), {
  // Skip slow checks in CI
  deadCode: false,
});

// Exit with error code if score is too low
if (score.score < 50) {
  console.error(`Health score ${score.score} is below threshold (50)`);
  process.exit(1);
}
```

---

## Error Handling

The `diagnose()` function throws errors for fatal issues:

```typescript
import { diagnose } from "vue-health/api";

try {
  const { diagnostics, score } = await diagnose("./my-vue-app");
} catch (error) {
  if (error.message.includes("not a Vue project")) {
    console.error("Directory is not a Vue project");
  } else {
    console.error("Diagnostic failed:", error.message);
  }
}
```

---

<a name="中文"></a>
## 中文

vue-health 编程 API 允许您从自己的代码运行诊断。

---

## 安装

```bash
npm install vue-health
```

---

## 主函数：`diagnose()`

### 签名

```typescript
function diagnose(
  directory: string,
  options?: ScanOptions
): Promise<DiagnoseResult>
```

### 参数

| 参数 | 类型 | 必需 | 描述 |
|------|------|------|------|
| `directory` | `string` | 是 | Vue 项目目录的绝对或相对路径 |
| `options` | `ScanOptions` | 否 | 配置选项（见下文）|

### 返回类型

```typescript
interface DiagnoseResult {
  diagnostics: Diagnostic[];
  score: ScoreResult;
}
```

---

## 类型参考

### ScanOptions

```typescript
interface ScanOptions {
  /** 启用/禁用 lint 检查（默认：true）*/
  lint?: boolean;

  /** 启用/禁用死代码检测（默认：true）*/
  deadCode?: boolean;

  /** 显示每条诊断的文件详情（默认：false）*/
  verbose?: boolean;

  /** 使用 ESLint 深度分析替代 oxlint（默认：false）*/
  deep?: boolean;

  /** 仅扫描特定文件路径（支持 glob 模式）*/
  includePaths?: string[];
}
```

### Diagnostic

```typescript
interface Diagnostic {
  /** 有问题的文件的绝对路径 */
  filePath: string;

  /** 插件名（如 "vue"、"typescript"、"knip"）*/
  plugin: string;

  /** 规则 ID（如 "no-mutating-props"、"no-unused-vars"）*/
  rule: string;

  /** 严重程度级别 */
  severity: "error" | "warning";

  /** 人类可读的问题描述 */
  message: string;

  /** 建议的修复或解释 */
  help: string;

  /** 行号（从 1 开始）*/
  line: number;

  /** 列号（从 1 开始）*/
  column: number;

  /** 分类："Correctness"、"Performance"、"Security" 或 "Dead Code" */
  category: string;

  /** 评分的内部权重（通常错误为 3，警告为 1）*/
  weight?: number;
}
```

### ScoreResult

```typescript
interface ScoreResult {
  /** 健康分数 0-100 */
  score: number;

  /** 标签："Good"、"OK" 或 "Needs Work" */
  label: string;
}
```

### ProjectInfo

```typescript
interface ProjectInfo {
  /** 项目根目录的绝对路径 */
  rootDirectory: string;

  /** package.json 中的项目名称 */
  projectName: string;

  /** Vue 版本（如 "^3.5.0"），未检测到则为 null */
  vueVersion: string | null;

  /** 检测到的框架："nuxt"、"vite"、"vue-cli"、"quasar" 或 "unknown" */
  framework: Framework;

  /** 是否检测到 TypeScript */
  hasTypeScript: boolean;

  /** 扫描的源文件数量 */
  sourceFileCount: number;
}

type Framework = "nuxt" | "vite" | "vue-cli" | "quasar" | "unknown";
```

---

## 使用示例

### 基本用法

```typescript
import { diagnose } from "vue-health/api";

const { diagnostics, score } = await diagnose("./my-vue-app");

console.log(`健康分数: ${score.score}/100 (${score.label})`);

for (const d of diagnostics) {
  console.log(`[${d.severity}] ${d.message}`);
  console.log(`  at ${d.filePath}:${d.line}:${d.column}`);
  if (d.help) {
    console.log(`  hint: ${d.help}`);
  }
}
```

### 带选项

```typescript
import { diagnose } from "vue-health/api";

const { diagnostics, score } = await diagnose("./my-vue-app", {
  lint: true,
  deadCode: true,
  verbose: true,
  deep: false,
});
```

### 按严重程度过滤

```typescript
import { diagnose } from "vue-health/api";

const { diagnostics } = await diagnose("./my-vue-app");

const errors = diagnostics.filter(d => d.severity === "error");
const warnings = diagnostics.filter(d => d.severity === "warning");

console.log(`找到 ${errors.length} 个错误和 ${warnings.length} 个警告`);
```

### 按分类分组

```typescript
import { diagnose } from "vue-health/api";

const { diagnostics } = await diagnose("./my-vue-app");

const byCategory = diagnostics.reduce((acc, d) => {
  if (!acc[d.category]) acc[d.category] = [];
  acc[d.category].push(d);
  return acc;
}, {} as Record<string, typeof diagnostics>);

for (const [category, items] of Object.entries(byCategory)) {
  console.log(`${category}: ${items.length} 个问题`);
}
```

### CI/CD 用法

```typescript
import { diagnose } from "vue-health/api";

const { score } = await diagnose(process.cwd(), {
  // CI 中跳过慢速检查
  deadCode: false,
});

// 如果分数太低则退出并报错
if (score.score < 50) {
  console.error(`健康分数 ${score.score} 低于阈值（50）`);
  process.exit(1);
}
```

---

## 错误处理

`diagnose()` 函数对致命问题抛出错误：

```typescript
import { diagnose } from "vue-health/api";

try {
  const { diagnostics, score } = await diagnose("./my-vue-app");
} catch (error) {
  if (error.message.includes("不是 Vue 项目")) {
    console.error("目录不是 Vue 项目");
  } else {
    console.error("诊断失败：", error.message);
  }
}
```
