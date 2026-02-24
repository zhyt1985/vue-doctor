# Scoring Algorithm

[English](#english) | [中文](#中文)

---

<a name="english"></a>
## English

vue-health calculates a **0-100 health score** based on diagnostic count and severity.

---

## Score Formula

```
base_score = 100
error_penalty = 3 per error
warning_penalty = 1 per warning

total_penalty = sum(error_penalties) + sum(warning_penalties)
final_score = max(0, base_score - total_penalty)
```

### Per-Rule Penalty Cap

To prevent a single noisy rule from dominating the score, **each rule has a penalty cap**:

```
max_penalty_per_rule = 10

For a given rule:
  rule_penalty = min(total_violations × severity_weight, 10)
```

**Examples**:
- 5 `no-mutating-props` errors → `min(5 × 3, 10)` = **10 penalty** (capped)
- 3 `require-v-for-key` warnings → `min(3 × 1, 10)` = **3 penalty** (uncapped)

---

## Score Categories

| Score | Label | Color | Emoji | Meaning |
|-------|-------|-------|-------|---------|
| 75-100 | Good | Green | `( ◕‿◕)` | Healthy codebase, minor issues |
| 50-74 | OK | Yellow | `( ◑‿◑)` | Acceptable quality, some improvements needed |
| 0-49 | Needs Work | Red | `( ◉_◉)` | Significant issues require attention |

---

## Calculation Examples

### Example 1: Good Score (87/100)

```
Lint issues: 12 (10 errors, 2 warnings)
Dead code issues: 3 (warnings)

Error penalty: 10 × 3 = 30
Warning penalty: 5 × 1 = 5
Total penalty: 35

Score = 100 - 35 = 65
Wait — with per-rule caps:
- no-mutating-props: 5 errors → min(15, 10) = 10
- no-ref-as-operand: 3 errors → min(9, 10) = 9
- unused-component: 3 warnings → min(3, 10) = 3
- ... (other rules distributed)
Total = 13 (capped by per-rule limits)

Final score: 87/100 Good
```

### Example 2: OK Score (62/100)

```
Lint issues: 25 (15 errors, 10 warnings)
Dead code issues: 8 (warnings)

Error penalty (capped): 25
Warning penalty (capped): 10
Total penalty: 35

Score = 100 - 35 = 65
After per-rule caps: 38

Final score: 62/100 OK
```

### Example 3: Needs Work (35/100)

```
Lint issues: 50 (30 errors, 20 warnings)
Dead code issues: 15 (warnings)

Error penalty (capped): 45
Warning penalty (capped): 15
Total penalty: 60

Final score: 40/100 Needs Work
```

---

## Severity Weights

| Severity | Weight | Rationale |
|----------|--------|-----------|
| Error | 3 | Errors typically indicate bugs or breaking issues |
| Warning | 1 | Warnings suggest improvements but don't break functionality |

---

<a name="中文"></a>
## 中文

vue-health 根据诊断数量和严重程度计算 **0-100 健康分数**。

---

## 分数公式

```
基础分数 = 100
错误惩罚 = 每条错误 3 分
警告惩罚 = 每条警告 1 分

总惩罚 = sum(错误惩罚) + sum(警告惩罚)
最终分数 = max(0, 基础分数 - 总惩罚)
```

### 每规则惩罚上限

为防止单个嘈杂规则主导分数，**每条规则都有惩罚上限**：

```
每规则最大惩罚 = 10

对于给定规则：
  规则惩罚 = min(违规次数 × 严重性权重, 10)
```

**示例**：
- 5 条 `no-mutating-props` 错误 → `min(5 × 3, 10)` = **10 惩罚**（已上限）
- 3 条 `require-v-for-key` 警告 → `min(3 × 1, 10)` = **3 惩罚**（未上限）

---

## 分数分类

| 分数 | 等级 | 颜色 | 表情 | 含义 |
|------|------|------|------|------|
| 75-100 | Good | 绿色 | `( ◕‿◕)` | 健康的代码库，少量问题 |
| 50-74 | OK | 黄色 | `( ◑‿◑)` | 可接受的质量，需要一些改进 |
| 0-49 | Needs Work | 红色 | `( ◉_◉)` | 存在重大问题需要关注 |

---

## 计算示例

### 示例 1：Good 分数 (87/100)

```
Lint 问题：12（10 条错误，2 条警告）
死代码问题：3（警告）

错误惩罚：10 × 3 = 30
警告惩罚：5 × 1 = 5
总惩罚：35

分数 = 100 - 35 = 65
等等 — 考虑每规则上限：
- no-mutating-props: 5 条错误 → min(15, 10) = 10
- no-ref-as-operand: 3 条错误 → min(9, 10) = 9
- unused-component: 3 条警告 → min(3, 10) = 3
- ...（其他规则分散）
总计 = 13（受每规则限制）

最终分数：87/100 Good
```

### 示例 2：OK 分数 (62/100)

```
Lint 问题：25（15 条错误，10 条警告）
死代码问题：8（警告）

错误惩罚（已上限）：25
警告惩罚（已上限）：10
总惩罚：35

分数 = 100 - 35 = 65
每规则上限后：38

最终分数：62/100 OK
```

### 示例 3：Needs Work 分数 (35/100)

```
Lint 问题：50（30 条错误，20 条警告）
死代码问题：15（警告）

错误惩罚（已上限）：45
警告惩罚（已上限）：15
总惩罚：60

最终分数：40/100 Needs Work
```

---

## 严重性权重

| 严重性 | 权重 | 理由 |
|--------|------|------|
| Error | 3 | 错误通常表示 bug 或破坏性问题 |
| Warning | 1 | 警告建议改进但不会破坏功能 |
