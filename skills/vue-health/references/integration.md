# CI/CD Integration

[English](#english) | [中文](#中文)

---

<a name="english"></a>
## English

Examples for integrating vue-health into your CI/CD pipeline.

---

## GitHub Actions

### Basic Workflow

```yaml
name: Vue Health Check

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  health-check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Run vue-health
        run: npx vue-health .

      - name: Check score threshold
        run: |
          SCORE=$(npx vue-health . --score)
          if [ $SCORE -lt 50 ]; then
            echo "Health score $SCORE is below threshold (50)"
            exit 1
          fi
```

### With Comment on PR

```yaml
name: Vue Health Check

on:
  pull_request:
    branches: [main]

jobs:
  health-check:
    runs-on: ubuntu-latest
    permissions:
      pull-requests: write
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0  # Needed for diff mode

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Run vue-health on changed files
        id: health
        run: |
          OUTPUT=$(npx vue-health . --diff main)
          SCORE=$(npx vue-health . --diff main --score)
          echo "score=$SCORE" >> $GITHUB_OUTPUT
          echo "$OUTPUT" > health.txt

      - name: Comment on PR
        uses: actions/github-script@v7
        if: github.event_name == 'pull_request'
        with:
          script: |
            const fs = require('fs');
            const score = '${{ steps.health.outputs.score }}';
            const output = fs.readFileSync('health.txt', 'utf8');
            const emoji = score >= 75 ? '✅' : score >= 50 ? '⚠️' : '❌';
            const body = `${emoji} Vue Health Score: ${score}/100\n\n\`\`\`\n${output}\n\`\`\``;
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: body
            });
```

---

## GitLab CI

### Basic Pipeline

```yaml
stages:
  - health

vue-health:
  stage: health
  image: node:20
  script:
    - npx vue-health .
  allow_failure: false
```

### With Score Threshold

```yaml
stages:
  - health

vue-health:
  stage: health
  image: node:20
  script:
    - |
      SCORE=$(npx vue-health . --score)
      echo "Health score: $SCORE"
      if [ $SCORE -lt 50 ]; then
        echo "Health score $SCORE is below threshold (50)"
        exit 1
      fi
  allow_failure: false
```

### Merge Request Pipeline

```yaml
stages:
  - health

vue-health:mr:
  stage: health
  image: node:20
  script:
    - npx vue-health . --diff $CI_MERGE_REQUEST_DIFF_BASE_BRANCH
  rules:
    - if: $CI_PIPELINE_SOURCE == "merge_request_event"
  allow_failure: true
```

---

## npm Scripts

### package.json

```json
{
  "scripts": {
    "health": "vue-health .",
    "health:score": "vue-health . --score",
    "health:diff": "vue-health . --diff",
    "health:verbose": "vue-health . --verbose",
    "precommit": "vue-health . --score",
    "prepush": "vue-health ."
  }
}
```

### Usage

```bash
# Run health check
npm run health

# Get score only
npm run health:score

# Check changed files only
npm run health:diff

# Verbose output
npm run health:verbose
```

---

## Pre-commit Hooks

### Using Husky

```bash
npm install -D husky
npx husky init
```

**`.husky/pre-commit`**:
```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

# Run vue-health on staged files
SCORE=$(npx vue-health . --score)
if [ $SCORE -lt 50 ]; then
  echo "❌ Health score $SCORE is below threshold (50)"
  echo "Please fix issues before committing."
  exit 1
fi
```

### Using lint-staged

**Install**:
```bash
npm install -D lint-staged
```

**`package.json`**:
```json
{
  "lint-staged": {
    "*.{vue,js,ts}": "vue-health --include"
  }
}
```

---

## Pre-push Hooks

### Using Husky

**`.husky/pre-push`**:
```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

echo "Running vue-health before push..."
npx vue-health .

if [ $? -ne 0 ]; then
  echo "❌ Health check failed. Push aborted."
  exit 1
fi
```

---

## Azure Pipelines

```yaml
trigger:
  - main

pr:
  - main

pool:
  vmImage: 'ubuntu-latest'

steps:
  - task: NodeTool@0
    inputs:
      versionSpec: '20'
    displayName: 'Install Node.js'

  - script: npx vue-health .
    displayName: 'Run vue-health'

  - script: |
      SCORE=$(npx vue-health . --score)
      echo "##vso[task.setvariable variable=health.score]$SCORE"
    displayName: 'Get health score'

  - script: |
      if [ $HEALTH_SCORE -lt 50 ]; then
        echo "Health score $HEALTH_SCORE is below threshold (50)"
        exit 1
      fi
    displayName: 'Check threshold'
    env:
      HEALTH_SCORE: $(health.score)
```

---

## CircleCI

```yaml
version: 2.1

orbs:
  node: circleci/node@5.1

jobs:
  health-check:
    docker:
      - image: cimg/node:20.11
    steps:
      - checkout
      - node/install-packages
      - run:
          name: Run vue-health
          command: npx vue-health .
      - run:
          name: Check score
          command: |
            SCORE=$(npx vue-health . --score)
            echo "Health score: $SCORE"
            if [ $SCORE -lt 50 ]; then
              echo "Health score $SCORE is below threshold (50)"
              exit 1
            fi

workflows:
  health-workflow:
    jobs:
      - health-check
```

---

## Jenkins Pipeline

```groovy
pipeline {
    agent any

    tools {
        nodejs 'Node-20'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Health Check') {
            steps {
                script {
                    sh 'npx vue-health .'
                }
            }
        }

        stage('Check Score') {
            steps {
                script {
                    def score = sh(
                        script: 'npx vue-health . --score',
                        returnStdout: true
                    ).trim() as Integer

                    echo "Health score: ${score}"

                    if (score < 50) {
                        error("Health score ${score} is below threshold (50)")
                    }
                }
            }
        }
    }

    post {
        always {
            cleanWs()
        }
    }
}
```

---

## Docker Integration

### Dockerfile

```dockerfile
FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm ci

# Copy source
COPY . .

# Install vue-health
RUN npm install -g vue-health

# Run health check
CMD ["vue-health", "."]
```

### docker-compose.yml

```yaml
version: '3.8'
services:
  app:
    build: .
    command: sh -c "vue-health . && npm run dev"
```

---

## Best Practices

1. **Use diff mode in PR checks** — Only scan changed files for faster feedback
2. **Set appropriate score thresholds** — Match your project's quality standards
3. **Allow failure in MR pipelines** — Don't block all PRs, use as informational
4. **Run full checks on main** — Complete analysis on main branch
5. **Comment scores on PRs** — Provide visibility into code quality trends
6. **Cache node_modules** — Speed up CI runs
7. **Use `--score` for thresholds** — Efficient for programmatic checks

---

<a name="中文"></a>
## 中文

将 vue-health 集成到 CI/CD 流水线的示例。

---

## GitHub Actions

### 基本工作流

```yaml
name: Vue Health Check

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  health-check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Run vue-health
        run: npx vue-health .

      - name: Check score threshold
        run: |
          SCORE=$(npx vue-health . --score)
          if [ $SCORE -lt 50 ]; then
            echo "Health score $SCORE is below threshold (50)"
            exit 1
          fi
```

### PR 评论

```yaml
name: Vue Health Check

on:
  pull_request:
    branches: [main]

jobs:
  health-check:
    runs-on: ubuntu-latest
    permissions:
      pull-requests: write
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0  # diff 模式需要

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Run vue-health on changed files
        id: health
        run: |
          OUTPUT=$(npx vue-health . --diff main)
          SCORE=$(npx vue-health . --diff main --score)
          echo "score=$SCORE" >> $GITHUB_OUTPUT
          echo "$OUTPUT" > health.txt

      - name: Comment on PR
        uses: actions/github-script@v7
        if: github.event_name == 'pull_request'
        with:
          script: |
            const fs = require('fs');
            const score = '${{ steps.health.outputs.score }}';
            const output = fs.readFileSync('health.txt', 'utf8');
            const emoji = score >= 75 ? '✅' : score >= 50 ? '⚠️' : '❌';
            const body = `${emoji} Vue Health Score: ${score}/100\n\n\`\`\`\n${output}\n\`\`\``;
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: body
            });
```

---

## GitLab CI

### 基本流水线

```yaml
stages:
  - health

vue-health:
  stage: health
  image: node:20
  script:
    - npx vue-health .
  allow_failure: false
```

### 分数阈值检查

```yaml
stages:
  - health

vue-health:
  stage: health
  image: node:20
  script:
    - |
      SCORE=$(npx vue-health . --score)
      echo "Health score: $SCORE"
      if [ $SCORE -lt 50 ]; then
        echo "Health score $SCORE is below threshold (50)"
        exit 1
      fi
  allow_failure: false
```

### 合并请求流水线

```yaml
stages:
  - health

vue-health:mr:
  stage: health
  image: node:20
  script:
    - npx vue-health . --diff $CI_MERGE_REQUEST_DIFF_BASE_BRANCH
  rules:
    - if: $CI_PIPELINE_SOURCE == "merge_request_event"
  allow_failure: true
```

---

## npm Scripts

### package.json

```json
{
  "scripts": {
    "health": "vue-health .",
    "health:score": "vue-health . --score",
    "health:diff": "vue-health . --diff",
    "health:verbose": "vue-health . --verbose",
    "precommit": "vue-health . --score",
    "prepush": "vue-health ."
  }
}
```

### 使用

```bash
# 运行健康检查
npm run health

# 仅获取分数
npm run health:score

# 仅检查变更文件
npm run health:diff

# 详细输出
npm run health:verbose
```

---

## Pre-commit Hooks

### 使用 Husky

```bash
npm install -D husky
npx husky init
```

**`.husky/pre-commit`**:
```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

# 对暂存文件运行 vue-health
SCORE=$(npx vue-health . --score)
if [ $SCORE -lt 50 ]; then
  echo "❌ Health score $SCORE is below threshold (50)"
  echo "Please fix issues before committing."
  exit 1
fi
```

### 使用 lint-staged

**安装**：
```bash
npm install -D lint-staged
```

**`package.json`**:
```json
{
  "lint-staged": {
    "*.{vue,js,ts}": "vue-health --include"
  }
}
```

---

## Pre-push Hooks

### 使用 Husky

**`.husky/pre-push`**:
```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

echo "Running vue-health before push..."
npx vue-health .

if [ $? -ne 0 ]; then
  echo "❌ Health check failed. Push aborted."
  exit 1
fi
```

---

## Azure Pipelines

```yaml
trigger:
  - main

pr:
  - main

pool:
  vmImage: 'ubuntu-latest'

steps:
  - task: NodeTool@0
    inputs:
      versionSpec: '20'
    displayName: 'Install Node.js'

  - script: npx vue-health .
    displayName: 'Run vue-health'

  - script: |
      SCORE=$(npx vue-health . --score)
      echo "##vso[task.setvariable variable=health.score]$SCORE"
    displayName: 'Get health score'

  - script: |
      if [ $HEALTH_SCORE -lt 50 ]; then
        echo "Health score $HEALTH_SCORE is below threshold (50)"
        exit 1
      fi
    displayName: 'Check threshold'
    env:
      HEALTH_SCORE: $(health.score)
```

---

## CircleCI

```yaml
version: 2.1

orbs:
  node: circleci/node@5.1

jobs:
  health-check:
    docker:
      - image: cimg/node:20.11
    steps:
      - checkout
      - node/install-packages
      - run:
          name: Run vue-health
          command: npx vue-health .
      - run:
          name: Check score
          command: |
            SCORE=$(npx vue-health . --score)
            echo "Health score: $SCORE"
            if [ $SCORE -lt 50 ]; then
              echo "Health score $SCORE is below threshold (50)"
              exit 1
            fi

workflows:
  health-workflow:
    jobs:
      - health-check
```

---

## Jenkins Pipeline

```groovy
pipeline {
    agent any

    tools {
        nodejs 'Node-20'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Health Check') {
            steps {
                script {
                    sh 'npx vue-health .'
                }
            }
        }

        stage('Check Score') {
            steps {
                script {
                    def score = sh(
                        script: 'npx vue-health . --score',
                        returnStdout: true
                    ).trim() as Integer

                    echo "Health score: ${score}"

                    if (score < 50) {
                        error("Health score ${score} is below threshold (50)")
                    }
                }
            }
        }
    }

    post {
        always {
            cleanWs()
        }
    }
}
```

---

## Docker 集成

### Dockerfile

```dockerfile
FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm ci

# Copy source
COPY . .

# Install vue-health
RUN npm install -g vue-health

# Run health check
CMD ["vue-health", "."]
```

### docker-compose.yml

```yaml
version: '3.8'
services:
  app:
    build: .
    command: sh -c "vue-health . && npm run dev"
```

---

## 最佳实践

1. **在 PR 检查中使用 diff 模式** — 仅扫描变更文件以获得更快反馈
2. **设置适当的分数阈值** — 匹配项目的质量标准
3. **MR 流水线中允许失败** — 不要阻止所有 PR，作为信息参考
4. **在 main 上运行完整检查** — main 分支上的完整分析
5. **在 PR 上评论分数** — 提供代码质量趋势的可见性
6. **缓存 node_modules** — 加快 CI 运行
7. **使用 `--score` 进行阈值检查** — 高效的程序化检查
