import { siteConfig } from "@/config/site";

// 마케팅 영역 푸터
export function Footer() {
  return (
    <footer className="border-t">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-6 text-sm text-muted-foreground sm:flex-row">
        <p>© {siteConfig.name}. All rights reserved.</p>
        <p>Next.js · Tailwind CSS · shadcn/ui</p>
      </div>
    </footer>
  );
}
