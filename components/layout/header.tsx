import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/shared/logo";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { MainNav } from "@/components/layout/main-nav";
import { MobileNav } from "@/components/layout/mobile-nav";

// 마케팅 영역 상단 헤더
export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-4 px-4">
        <MobileNav />
        <Logo />
        <MainNav className="ml-6 hidden md:flex" />
        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
          <Button
            variant="outline"
            size="sm"
            render={<Link href="/login" />}
            nativeButton={false}
          >
            로그인
          </Button>
        </div>
      </div>
    </header>
  );
}
