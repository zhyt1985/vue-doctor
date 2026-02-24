# Diagnostic Rules Reference

[English](#english) | [中文](#中文)

---

<a name="english"></a>
## English

vue-health includes **40+ diagnostic rules** organized into four categories:

- **Correctness** — Catch bugs and enforce Vue.js best practices
- **Performance** — Identify performance anti-patterns
- **Security** — Detect potential security vulnerabilities
- **Dead Code** — Find unused files, exports, and dependencies

---

## Correctness Rules

| Rule ID | Category | Description | Severity |
|---------|----------|-------------|----------|
| `no-mutating-props` | Vue | Don't mutate props directly | Error |
| `no-ref-as-operand` | Vue | Use `.value` to access refs in script | Error |
| `no-setup-props-reactivity-loss` | Vue | Maintain reactivity when destructuring props | Error |
| `no-side-effects-in-computed-properties` | Vue | Computed properties should be pure | Error |
| `no-async-in-computed-properties` | Vue | No async in computed — use watchers | Error |
| `no-lifecycle-after-await` | Vue | Lifecycle hooks must be before `await` in setup | Error |
| `no-watch-after-await` | Vue | `watch()` must be before `await` in setup | Error |
| `no-shared-component-data` | Vue | `data()` must return a fresh object | Error |
| `no-dupe-keys` | Vue | No duplicate keys across data/computed/methods | Error |
| `return-in-computed-property` | Vue | Computed properties must return a value | Error |
| `valid-v-model` | Vue | v-model needs a writable expression | Error |
| `valid-v-for` | Vue | v-for requires valid syntax | Error |
| `valid-v-if` | Vue | v-if requires valid syntax | Error |
| `valid-v-on` | Vue | v-on requires valid syntax | Error |
| `valid-v-bind` | Vue | v-bind requires valid syntax | Error |
| `valid-v-slot` | Vue | v-slot requires valid syntax | Error |
| `require-v-for-key` | Vue | `:key` is required on v-for elements | Warning |
| `no-setup-props-destructure` | Vue | Avoid destructuring props in setup | Warning |
| `no-template-shadow` | Vue | Don't shadow template variables | Warning |
| `prop-name-casing` | Vue | Use camelCase for prop names | Warning |
| `vue-component-name-casing` | Vue | Use PascalCase for component names | Warning |
| `no-reserved-component-names` | Vue | Don't use reserved component names | Error |
| `no-this-in-setup` | Vue | Don't use `this` in setup() | Error |
| `no-unregistered-components` | Vue | Components must be registered | Warning |
| `no-unused-components` | Vue | Remove unused component imports | Warning |
| `no-unused-vars` | Vue | Remove unused variables | Warning |
| `no-extra-parens` | General | Remove unnecessary parentheses | Warning |
| `no-console` | General | Remove console statements in production | Warning |
| `no-debugger` | General | Remove debugger statements | Error |
| `no-undef` | General | Detect undefined variables | Error |
| `no-redeclare` | General | No variable redeclaration | Error |
| `no-prototype-builtins` | General | Don't access Object.prototype methods directly | Warning |
| `no-unsafe-negation` | General | Fix unsafe negation in relational operators | Error |
| `use-isnan` | General | Use `isNaN()` to check NaN | Error |
| `no-throw-literal` | General | Throw Error objects, not literals | Warning |
| `no-empty` | General | Empty blocks should have comments | Warning |
| `no-constant-condition` | General | Detect constant conditions in loops | Warning |
| `no-duplicate-imports` | TypeScript | Merge duplicate imports | Warning |
| `no-implicit-any` | TypeScript | Avoid implicit `any` types | Warning |
| `no-explicit-any` | TypeScript | Avoid explicit `any` types | Warning |
| `no-unused-vars` | TypeScript | Remove unused variables | Warning |

---

## Performance Rules

| Rule ID | Category | Description | Severity |
|---------|----------|-------------|----------|
| `no-use-v-if-with-v-for` | Vue | Don't use v-if and v-for on the same element | Warning |
| `no-v-html` | Vue | `v-html` can lead to XSS — sanitize or use interpolation | Warning |

---

## Security Rules

| Rule ID | Category | Description | Severity |
|---------|----------|-------------|----------|
| `no-v-html` | Vue | `v-html` can lead to XSS — sanitize or use interpolation | Warning |
| `no-inline-template` | Vue | Avoid inline templates for security | Warning |

---

## Dead Code Rules (via knip)

| Rule ID | Category | Description | Severity |
|---------|----------|-------------|----------|
| `unused-files` | Dead Code | Files not imported anywhere | Warning |
| `unused-exports` | Dead Code | Exported symbols never consumed | Warning |
| `unused-types` | Dead Code | Type exports never used | Warning |
| `unused-dependencies` | Dead Code | Dependencies not referenced in code | Warning |
| `unused-dev-dependencies` | Dead Code | Dev dependencies not referenced | Warning |
| `duplicates` | Dead Code | Duplicate exports or dependencies | Warning |

---

<a name="中文"></a>
## 中文

vue-health 包含 **40+ 诊断规则**，分为四类：

- **正确性** — 捕获错误并强制执行 Vue.js 最佳实践
- **性能** — 识别性能反模式
- **安全** — 检测潜在安全漏洞
- **死代码** — 查找未使用的文件、导出和依赖

---

## 正确性规则

| 规则 ID | 分类 | 描述 | 严重程度 |
|---------|------|------|----------|
| `no-mutating-props` | Vue | 禁止直接修改 props | 错误 |
| `no-ref-as-operand` | Vue | 在 script 中使用 `.value` 访问 ref | 错误 |
| `no-setup-props-reactivity-loss` | Vue | 解构 props 时保持响应性 | 错误 |
| `no-side-effects-in-computed-properties` | Vue | 计算属性应为纯函数 | 错误 |
| `no-async-in-computed-properties` | Vue | 计算属性中禁止异步操作 | 错误 |
| `no-lifecycle-after-await` | Vue | 生命周期钩子必须在 setup 的 `await` 之前注册 | 错误 |
| `no-watch-after-await` | Vue | `watch()` 必须在 setup 的 `await` 之前调用 | 错误 |
| `no-shared-component-data` | Vue | `data()` 必须返回新对象 | 错误 |
| `no-dupe-keys` | Vue | data/computed/methods 中不允许重复键名 | 错误 |
| `return-in-computed-property` | Vue | 计算属性必须有返回值 | 错误 |
| `valid-v-model` | Vue | v-model 需要可写的表达式 | 错误 |
| `valid-v-for` | Vue | v-for 需要有效语法 | 错误 |
| `valid-v-if` | Vue | v-if 需要有效语法 | 错误 |
| `valid-v-on` | Vue | v-on 需要有效语法 | 错误 |
| `valid-v-bind` | Vue | v-bind 需要有效语法 | 错误 |
| `valid-v-slot` | Vue | v-slot 需要有效语法 | 错误 |
| `require-v-for-key` | Vue | v-for 元素必须绑定 `:key` | 警告 |
| `no-setup-props-destructure` | Vue | 避免在 setup 中解构 props | 警告 |
| `no-template-shadow` | Vue | 不要遮蔽模板变量 | 警告 |
| `prop-name-casing` | Vue | 使用 camelCase 命名 props | 警告 |
| `vue-component-name-casing` | Vue | 使用 PascalCase 命名组件 | 警告 |
| `no-reserved-component-names` | Vue | 不要使用保留的组件名 | 错误 |
| `no-this-in-setup` | Vue | 不要在 setup() 中使用 `this` | 错误 |
| `no-unregistered-components` | Vue | 组件必须注册 | 警告 |
| `no-unused-components` | Vue | 移除未使用的组件导入 | 警告 |
| `no-unused-vars` | Vue | 移除未使用的变量 | 警告 |
| `no-extra-parens` | General | 移除不必要的括号 | 警告 |
| `no-console` | General | 生产环境移除 console 语句 | 警告 |
| `no-debugger` | General | 移除 debugger 语句 | 错误 |
| `no-undef` | General | 检测未定义的变量 | 错误 |
| `no-redeclare` | General | 禁止变量重复声明 | 错误 |
| `no-prototype-builtins` | General | 不要直接访问 Object.prototype 方法 | 警告 |
| `no-unsafe-negation` | General | 修复关系运算符中的不安全否定 | 错误 |
| `use-isnan` | General | 使用 `isNaN()` 检查 NaN | 错误 |
| `no-throw-literal` | General | 抛出 Error 对象，而非字面量 | 警告 |
| `no-empty` | General | 空代码块应有注释 | 警告 |
| `no-constant-condition` | General | 检测循环中的常量条件 | 警告 |
| `no-duplicate-imports` | TypeScript | 合并重复的导入 | 警告 |
| `no-implicit-any` | TypeScript | 避免隐式 `any` 类型 | 警告 |
| `no-explicit-any` | TypeScript | 避免显式 `any` 类型 | 警告 |
| `no-unused-vars` | TypeScript | 移除未使用的变量 | 警告 |

---

## 性能规则

| 规则 ID | 分类 | 描述 | 严重程度 |
|---------|------|------|----------|
| `no-use-v-if-with-v-for` | Vue | 禁止在同一元素上同时使用 v-if 和 v-for | 警告 |
| `no-v-html` | Vue | `v-html` 可能导致 XSS，应使用文本插值或对内容进行消毒 | 警告 |

---

## 安全规则

| 规则 ID | 分类 | 描述 | 严重程度 |
|---------|------|------|----------|
| `no-v-html` | Vue | `v-html` 可能导致 XSS，应使用文本插值或对内容进行消毒 | 警告 |
| `no-inline-template` | Vue | 为安全考虑避免内联模板 | 警告 |

---

## 死代码规则（via knip）

| 规则 ID | 分类 | 描述 | 严重程度 |
|---------|------|------|----------|
| `unused-files` | Dead Code | 未被任何文件导入的文件 | 警告 |
| `unused-exports` | Dead Code | 导出了但从未被消费的符号 | 警告 |
| `unused-types` | Dead Code | 从未使用的类型导出 | 警告 |
| `unused-dependencies` | Dead Code | 代码中未引用的依赖 | 警告 |
| `unused-dev-dependencies` | Dead Code | 未被引用的开发依赖 | 警告 |
| `duplicates` | Dead Code | 重复的导出或依赖 | 警告 |
