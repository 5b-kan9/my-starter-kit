import {
  Code2,
  Database,
  Globe,
  Palette,
  Settings,
  Shield,
  Smartphone,
  Users,
  Zap,
} from "lucide-react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const features = [
  {
    icon: Zap,
    title: "빠른 성능",
    description: "Next.js 16의 최적화된 빌드로 빠른 로딩 속도와 뛰어난 사용자 경험을 제공합니다.",
  },
  {
    icon: Shield,
    title: "타입 안정성",
    description: "TypeScript로 런타임 에러를 방지하고 개발 생산성을 크게 향상시킵니다.",
  },
  {
    icon: Palette,
    title: "아름다운 디자인",
    description: "ShadcnUI와 TailwindCSS로 구성된 모던하고 일관된 디자인 시스템을 제공합니다.",
  },
  {
    icon: Code2,
    title: "개발자 경험",
    description: "최고의 DX를 위한 ESLint, Prettier, Husky 등 개발 도구가 미리 설정되어 있습니다.",
  },
  {
    icon: Smartphone,
    title: "반응형 디자인",
    description: "usehooks-ts를 활용한 완벽한 반응형 디자인으로 모든 디바이스에서 최적화됩니다.",
  },
  {
    icon: Globe,
    title: "SEO 최적화",
    description: "검색 엔진 최적화와 메타데이터 관리가 기본으로 설정되어 있습니다.",
  },
  {
    icon: Settings,
    title: "확장 가능",
    description: "모듈화된 구조로 새로운 기능을 쉽게 추가하고 커스터마이징할 수 있습니다.",
  },
  {
    icon: Users,
    title: "프로덕션 준비",
    description: "실제 서비스 운영에 필요한 모든 설정과 보안 기능이 포함되어 있습니다.",
  },
  {
    icon: Database,
    title: "상태 관리",
    description: "검증된 라이브러리들을 활용한 효율적인 상태 관리 솔루션을 제공합니다.",
  },
];

// 주요 기능 섹션 (히어로와 구분되는 배경)
export function Features() {
  return (
    <section id="features" className="scroll-mt-14 border-y bg-muted/50">
      <div className="mx-auto max-w-6xl px-4 py-24">
        <div className="mb-12 space-y-3 text-center">
          <h2 className="text-3xl font-bold tracking-tight">주요 기능</h2>
          <p className="text-muted-foreground">
            바로 개발을 시작할 수 있도록 필요한 것들을 갖췄습니다.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, title, description }) => (
            <Card key={title}>
              <CardHeader>
                <Icon className="mb-2 size-8" />
                <CardTitle className="text-lg">{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
