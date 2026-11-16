# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 명령어

```bash
npm run dev     # 개발 서버 (http://localhost:3000)
npm run build   # 프로덕션 빌드
npm run lint    # ESLint
```

테스트 러너는 설정되어 있지 않다.

## Next.js 버전 주의

Next.js 16.4.6 / React 19.3 / Tailwind CSS v4 기반이며 기존 지식과 다른 breaking change가 있다. 코드를 작성하기 전에 `node_modules/next/dist/docs/`의 관련 가이드를 읽는다 (`AGENTS.md` 참고). `next.config.ts`에서 `cacheComponents`, `partialPrefetching`을 켜 두었으므로 데이터 접근/캐싱 코드는 이 설정을 전제로 작성한다. 타입은 전역 `LayoutProps<"/">` 같은 헬퍼를 사용한다.

Tailwind는 PostCSS 대신 `@tailwindcss/turbopack` 로더를 `next.config.ts`의 `turbopack.rules`로 연결한다.

## 아키텍처

App Router 라우트 그룹 3개가 각각 다른 레이아웃 골격을 가진다.

- `app/(marketing)/` — 헤더 + 푸터. 랜딩, `docs`, `pricing`, `examples/*` (예제 6종)
- `app/(app)/` — 사이드바 + 상단바. `dashboard`, `settings`
- `app/(auth)/` — 중앙 카드. `login`, `register`
- `app/layout.tsx` — 폰트(Geist), `ThemeProvider`(next-themes, class 방식), `TooltipProvider`, `Toaster`

컴포넌트는 계층별로 분리되어 있다 (페이지 → 아래 계층을 조합).

- `components/ui/` — shadcn/ui (style `base-nova`, `@base-ui/react` 기반). 직접 수정하지 말고 CLI로 추가
- `components/shared/` — 공용 블록 (`PageHeader`, `EmptyState`, `Logo`, `ThemeToggle`, `UserMenu`)
- `components/layout/` — Header/Footer/Sidebar/Topbar 등 골격
- `components/landing|auth|settings|examples/` — 페이지 전용 컴포넌트. 예제 상세 페이지는 `examples/example-shell.tsx`(`ExampleShell`)로 공통 레이아웃을 쓴다

`config/site.ts`의 `siteConfig`가 사이트명/설명/URL(`NEXT_PUBLIC_SITE_URL`)과 마케팅·사이드바 네비게이션의 단일 소스다. 사이드바 `icon`은 문자열이며 `components/layout/`에서 아이콘 컴포넌트로 매핑한다.

폼은 react-hook-form + zod + `@hookform/resolvers`, 훅은 `usehooks-ts`, 토스트는 sonner를 사용한다. 경로 별칭은 `@/*`.

## shadcn 컴포넌트 추가

```bash
npx shadcn@latest add <component>
```

CLI가 `cn` import를 `"cn"`으로 생성하는 경우가 있다. 추가 후 `@/lib/utils`로 바꾼다.

```bash
sed -i 's|from "cn"|from "@/lib/utils"|' components/ui/*.tsx
```
