import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

// 하단 콜 투 액션 섹션
export function Cta() {
  return (
    <section className="bg-primary text-primary-foreground">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-4 py-20 text-center">
        <h2 className="text-3xl font-bold tracking-tight">
          지금 바로 시작해 보세요
        </h2>
        <p className="text-primary-foreground/80">
          설정은 끝났습니다. 아이디어를 구현하는 일에만 집중하세요.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Button
            size="lg"
            variant="secondary"
            render={<Link href="/dashboard" />}
            nativeButton={false}
          >
            바로 시작하기 <ArrowRight data-icon="inline-end" />
          </Button>
          <Button
            size="lg"
            variant="ghost"
            className="hover:bg-primary-foreground/10 hover:text-primary-foreground"
            render={<Link href="/register" />}
            nativeButton={false}
          >
            회원가입
          </Button>
        </div>
      </div>
    </section>
  );
}
