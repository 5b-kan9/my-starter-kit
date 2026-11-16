import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";

export function Hero() {
  return (
    // 헤더(h-14) 높이를 뺀 화면 전체를 채워 아래 섹션은 스크롤해야 보이게 함
    <section className="mx-auto flex min-h-[calc(100svh-3.5rem)] max-w-3xl flex-col items-center justify-center gap-6 px-4 py-24 text-center">
      <Badge variant="secondary">Next.js 16 · App Router</Badge>
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
        빠르게 시작하는 모던 웹 스타터킷
      </h1>
      <p className="text-lg text-muted-foreground">{siteConfig.description}</p>
      <div className="flex gap-3">
        <Button size="lg" render={<Link href="/dashboard" />} nativeButton={false}>
          시작하기 <ArrowRight data-icon="inline-end" />
        </Button>
        <Button
          size="lg"
          variant="outline"
          render={<Link href="/register" />}
          nativeButton={false}
        >
          회원가입
        </Button>
      </div>
    </section>
  );
}
