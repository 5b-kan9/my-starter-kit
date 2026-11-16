"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

// 데스크톱 상단 네비게이션 (현재 경로 강조)
export function MainNav({ className }: { className?: string }) {
  const pathname = usePathname();

  return (
    <nav className={cn("flex items-center gap-6 text-sm", className)}>
      {siteConfig.mainNav.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "transition-colors hover:text-foreground",
            pathname === item.href
              ? "font-medium text-foreground"
              : "text-muted-foreground"
          )}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  );
}
