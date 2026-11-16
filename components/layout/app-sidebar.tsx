"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Settings, type LucideIcon } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Logo } from "@/components/shared/logo";
import { siteConfig } from "@/config/site";

// config의 icon 문자열 → lucide 아이콘 매핑
const icons: Record<string, LucideIcon> = {
  "layout-dashboard": LayoutDashboard,
  settings: Settings,
};

// 앱 영역 사이드바 (접힘/모바일 대응은 shadcn Sidebar가 처리)
export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <Logo className="px-2 py-1" />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>메뉴</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {siteConfig.sidebarNav.map((item) => {
                const Icon = icons[item.icon];
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      isActive={pathname.startsWith(item.href)}
                      tooltip={item.title}
                      render={<Link href={item.href} />}
                    >
                      {Icon && <Icon />}
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
