---
description: shadcn/ui 컴포넌트를 추가하고 cn import 경로를 자동 수정한다
argument-hint: <component> [component...]
allowed-tools: Bash(npx shadcn@latest add:*), Bash(sed:*), Bash(npm run lint:*), Bash(git status:*)
---

shadcn/ui 컴포넌트 `$ARGUMENTS` 를 프로젝트에 추가한다.

## 규칙

- `$ARGUMENTS` 가 비어 있으면 사용법(`/add-ui button card`)만 안내하고 중단한다.
- `components/ui/` 파일은 직접 수정하지 않고 CLI로만 추가한다. 아래 import 치환만 예외다.

## 절차

1. 컴포넌트 추가

   ```bash
   npx shadcn@latest add $ARGUMENTS
   ```

   - 기존 파일 덮어쓰기 확인 프롬프트가 나오면 덮어쓰지 말고 사용자에게 먼저 묻는다.

2. `cn` import 경로 치환 (CLI가 `from "cn"` 으로 생성하는 경우가 있음)

   ```bash
   sed -i 's|from "cn"|from "@/lib/utils"|' components/ui/*.tsx
   ```

3. 검증

   ```bash
   npm run lint
   ```

   - lint 오류가 추가된 컴포넌트에서 발생하면 원인만 보고하고, 임의로 수정하지 않는다.

4. `git status` 로 추가/변경된 파일을 확인한다.

## 보고 형식

아래 형식으로 간결하게 보고한다. 코드 전문은 반복하지 않는다.

- ✅ 추가된 컴포넌트 - 파일 경로 한 줄씩
- ✅ import 치환 - 치환된 파일 수
- ✅ lint - 통과/실패 여부
- 사용자 확인 필요 사항이 있으면 따로 표시 (예: 의존 패키지 추가, 덮어쓰기 발생)
