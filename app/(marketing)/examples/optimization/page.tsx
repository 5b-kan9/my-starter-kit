import type { Metadata } from "next";
import { ExampleShell } from "@/components/examples/example-shell";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata: Metadata = { title: "설정 및 최적화" };

interface Topic {
  title: string;
  description: string;
  tag: string;
  code: string;
}

// 프로덕션 설정/최적화 항목
const topics: Topic[] = [
  {
    title: "메타데이터 / SEO",
    description: "페이지별 title, description, Open Graph를 선언적으로 설정합니다.",
    tag: "SEO",
    code: `export const metadata: Metadata = {
  title: "예제",
  description: "예제 모음",
  openGraph: { title: "예제" },
};`,
  },
  {
    title: "폰트 최적화",
    description: "next/font로 폰트를 self-host하고 레이아웃 이동을 막습니다.",
    tag: "성능",
    code: `import { Geist } from "next/font/google";

const geist = Geist({ subsets: ["latin"] });`,
  },
  {
    title: "이미지 최적화",
    description: "next/image가 크기 지정, 지연 로딩, 포맷 변환을 처리합니다.",
    tag: "성능",
    code: `import Image from "next/image";

<Image src="/hero.png" alt="소개" width={800} height={400} priority />`,
  },
  {
    title: "로딩 UI / Suspense",
    description: "loading.tsx로 세그먼트 단위 로딩 상태를 스트리밍합니다.",
    tag: "UX",
    code: `// app/loading.tsx
export default function Loading() {
  return <Skeleton className="h-8 w-full" />;
}`,
  },
  {
    title: "정적 prerender",
    description: "동적 API를 쓰지 않으면 빌드 시점에 정적으로 생성됩니다.",
    tag: "캐싱",
    code: `// next build 결과
○ /examples  (Static) prerendered as static content`,
  },
  {
    title: "에러 / 404 처리",
    description: "error.tsx와 not-found.tsx로 오류 화면을 제공합니다.",
    tag: "안정성",
    code: `// app/error.tsx ("use client")
export default function Error({ reset }) { ... }`,
  },
];

export default function OptimizationPage() {
  return (
    <ExampleShell
      title="설정 및 최적화"
      description="프로덕션 환경을 위한 설정과 최적화 기법을 정리했습니다."
    >
      <div className="grid gap-6 md:grid-cols-2">
        {topics.map((topic) => (
          <Card key={topic.title}>
            <CardHeader>
              <div className="flex items-center justify-between gap-2">
                <CardTitle>{topic.title}</CardTitle>
                <Badge variant="secondary">{topic.tag}</Badge>
              </div>
              <CardDescription>{topic.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <pre className="overflow-x-auto rounded-md bg-muted p-3 text-xs">
                {topic.code}
              </pre>
            </CardContent>
          </Card>
        ))}
      </div>
    </ExampleShell>
  );
}
