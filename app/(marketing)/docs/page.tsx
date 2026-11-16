import type { Metadata } from "next";
import { BookOpen } from "lucide-react";
import { EmptyState } from "@/components/shared/empty-state";
import { PageHeader } from "@/components/shared/page-header";

export const metadata: Metadata = { title: "문서" };

export default function DocsPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-8 px-4 py-16">
      <PageHeader title="문서" description="사용 가이드 페이지입니다." />
      <EmptyState icon={BookOpen} title="준비 중입니다" description="문서를 추가해 주세요." />
    </div>
  );
}
