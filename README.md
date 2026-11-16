# Next.js 스타터킷

Next.js 16 (App Router) + TypeScript + Tailwind CSS v4 + shadcn/ui + lucide-react 기반의 웹 스타터킷입니다.

## 실행 방법

```bash
npm install
npm run dev     # 개발 서버 (http://localhost:3000)
npm run build   # 프로덕션 빌드
npm run lint    # ESLint
```

## 사용 라이브러리 (검증된 라이브러리 우선)

| 용도 | 라이브러리 |
|---|---|
| UI | shadcn/ui (base-nova, `@base-ui/react`), lucide-react |
| 클래스 병합 | clsx + tailwind-merge (`lib/utils.ts`의 `cn`) |
| 다크모드 | next-themes |
| 토스트 | sonner |
| 폼/검증 | react-hook-form + zod + @hookform/resolvers |
| 훅 모음 | usehooks-ts (`useMediaQuery`, `useLocalStorage` 등) |

## 폴더 구조

```
app/
  (marketing)/   # 헤더 + 푸터 레이아웃, 랜딩 페이지
  (app)/         # 사이드바 + 상단바 레이아웃, dashboard, settings
  (auth)/        # 중앙 카드 레이아웃, login, register
  layout.tsx     # 폰트, ThemeProvider, Toaster
  not-found.tsx  error.tsx  loading.tsx
components/
  ui/            # shadcn/ui (직접 수정하지 말고 CLI로 추가)
  providers/     # ThemeProvider
  shared/        # 공용 블록: Logo, ThemeToggle, UserMenu, PageHeader, EmptyState
  layout/        # Header, Footer, MainNav, MobileNav, AppSidebar, AppTopbar
  landing/ auth/ settings/   # 페이지 전용 컴포넌트
config/site.ts   # 사이트명, 설명, 네비게이션
hooks/           # use-mobile (usehooks-ts 기반)
```

## 컴포넌트 계층

1. **Foundation**: `cn`, 디자인 토큰(`globals.css`), 폰트, ThemeProvider, `config/site.ts`
2. **Primitives / Composites** (`components/ui`): shadcn/ui 컴포넌트
3. **Shared Blocks** (`components/shared`): 앱 공통 조합 컴포넌트
4. **Layout** (`components/layout`, 라우트 그룹 `layout.tsx`): 페이지 골격
5. **Pages**: 샘플 화면

## 컴포넌트 추가

```bash
npx shadcn@latest add <component>
```

> 주의: CLI가 `cn` import를 `"cn"`으로 생성하면 `@/lib/utils`로 바꿔 주세요.
> (`sed -i 's|from "cn"|from "@/lib/utils"|' components/ui/*.tsx`)

## 다음 단계 (선택)

- 데이터 테이블: `@tanstack/react-table`, 차트: `recharts`(shadcn `chart`), 커맨드 팔레트: `cmdk`(shadcn `command`)
- URL 상태 관리: `nuqs`
- 인증: Auth.js 또는 Clerk 연동
