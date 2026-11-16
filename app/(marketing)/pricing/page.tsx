import type { Metadata } from "next";
import { Tag } from "lucide-react";
import { EmptyState } from "@/components/shared/empty-state";
import { PageHeader } from "@/components/shared/page-header";

export const metadata: Metadata = { title: "가격" };

export default function PricingPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-8 px-4 py-16">
      <PageHeader title="가격" description="요금제 안내 페이지입니다." />
      <EmptyState icon={Tag} title="준비 중입니다" description="요금제 내용을 추가해 주세요." />
    </div>
  );
}
