import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ComponentShowcase } from "@/components/examples/component-showcase";
import { PageHeader } from "@/components/shared/page-header";

export const metadata: Metadata = { title: "컴포넌트 쇼케이스" };

export default function ComponentShowcasePage() {
  return (
    <div className="mx-auto max-w-6xl space-y-8 px-4 py-16">
      <Link
        href="/examples"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        예제 모음
      </Link>
      <PageHeader
        title="컴포넌트 쇼케이스"
        description="프로젝트에 포함된 UI 컴포넌트의 실제 동작을 확인해보세요."
      />
      <ComponentShowcase />
    </div>
  );
}
