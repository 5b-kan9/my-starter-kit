import type { Metadata } from "next";
import Link from "next/link";
import {
  Code2,
  Database,
  FileText,
  LayoutTemplate,
  Palette,
  Settings,
  type LucideIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "예제" };

interface ExampleItem {
  title: string;
  description: string;
  icon: LucideIcon;
  tags: string[];
  // href가 없으면 준비 중으로 표시
  href?: string;
}

// 예제 카드 목록
const examples: ExampleItem[] = [
  {
    title: "컴포넌트 쇼케이스",
    description: "모든 UI 컴포넌트의 실제 동작을 확인하고 코드 예제를 살펴보세요.",
    icon: Palette,
    tags: ["UI/UX", "인터랙티브"],
    href: "/examples/components",
  },
  {
    title: "폼 예제",
    description: "react-hook-form과 zod를 활용한 다양한 폼 구현 예제입니다.",
    icon: FileText,
    tags: ["검증", "상태관리"],
    href: "/examples/forms",
  },
  {
    title: "레이아웃 예제",
    description: "다양한 레이아웃 패턴과 반응형 디자인 구현 방법을 확인하세요.",
    icon: LayoutTemplate,
    tags: ["반응형", "레이아웃"],
    href: "/examples/layouts",
  },
  {
    title: "usehooks-ts 예제",
    description: "usehooks-ts 라이브러리의 다양한 훅 사용법과 실용적인 예제들입니다.",
    icon: Code2,
    tags: ["훅", "유틸리티"],
    href: "/examples/hooks",
  },
  {
    title: "데이터 페칭",
    description: "API 호출, 로딩 상태, 에러 처리 등 데이터 관리 예제입니다.",
    icon: Database,
    tags: ["API", "비동기"],
    href: "/examples/data-fetching",
  },
  {
    title: "설정 및 최적화",
    description: "성능 최적화, SEO 설정, PWA 구현 등 프로덕션 환경을 위한 설정들입니다.",
    icon: Settings,
    tags: ["최적화", "SEO"],
    href: "/examples/optimization",
  },
];

export default function ExamplesPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-12 px-4 py-16">
      <div className="mx-auto max-w-2xl space-y-4 text-center">
        <h1 className="text-4xl font-bold tracking-tight">예제 모음</h1>
        <p className="text-muted-foreground">
          실제 동작하는 예제를 통해 스타터킷의 모든 기능을 탐색해보세요. 각 예제는
          소스 코드와 함께 제공됩니다.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {examples.map((item) => (
          <Card key={item.title} className="flex flex-col">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg bg-muted">
                  <item.icon className="size-5" />
                </div>
                <CardTitle className="text-lg">{item.title}</CardTitle>
              </div>
              <CardDescription className="pt-2">{item.description}</CardDescription>
            </CardHeader>
            <CardContent className="mt-auto space-y-4">
              <div className="flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
              {item.href ? (
                <Link
                  href={item.href}
                  className={cn(buttonVariants(), "h-9 w-full")}
                >
                  예제 보기
                </Link>
              ) : (
                <Button disabled className="h-9 w-full">
                  준비 중
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
