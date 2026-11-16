// 사이트 전역 설정 (이름, 설명, 네비게이션)
export const siteConfig = {
  name: "NextJS Starter",
  description:
    "Next.js 16, TypeScript, Tailwind CSS, shadcn/ui로 만든 모던 웹 스타터킷",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  // 마케팅 헤더/푸터 네비게이션
  mainNav: [
    { title: "예제", href: "/examples" },
    { title: "문서", href: "/docs" },
  ],
  // 앱 사이드바 네비게이션 (icon은 컴포넌트에서 매핑)
  sidebarNav: [
    { title: "대시보드", href: "/dashboard", icon: "layout-dashboard" },
    { title: "설정", href: "/settings", icon: "settings" },
  ],
  links: {
    github: "https://github.com",
  },
} as const;

export type SiteConfig = typeof siteConfig;
