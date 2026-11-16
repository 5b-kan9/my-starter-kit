import type { Metadata } from "next";
import { Activity, CreditCard, DollarSign, Users } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { EmptyState } from "@/components/shared/empty-state";
import { PageHeader } from "@/components/shared/page-header";

export const metadata: Metadata = { title: "대시보드" };

const stats = [
  { title: "총 매출", value: "₩45,231,890", icon: DollarSign },
  { title: "신규 사용자", value: "+2,350", icon: Users },
  { title: "판매", value: "+12,234", icon: CreditCard },
  { title: "활성 세션", value: "573", icon: Activity },
];

export default function DashboardPage() {
  return (
    <>
      <PageHeader title="대시보드" description="서비스 현황을 한눈에 확인하세요." />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(({ title, value, icon: Icon }) => (
          <Card key={title}>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-medium">{title}</CardTitle>
              <Icon className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
      <EmptyState
        title="최근 활동이 없습니다"
        description="데이터가 생기면 이곳에 표시됩니다."
      />
    </>
  );
}
