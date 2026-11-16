import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";

interface ExampleShellProps {
  title: string;
  description: string;
  children: ReactNode;
}

// 예제 상세 페이지 공통 레이아웃: 뒤로가기 링크 + 헤더 + 본문
export function ExampleShell({ title, description, children }: ExampleShellProps) {
  return (
    <div className="mx-auto max-w-6xl space-y-8 px-4 py-16">
      <Link
        href="/examples"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        예제 모음
      </Link>
      <PageHeader title={title} description={description} />
      {children}
    </div>
  );
}
