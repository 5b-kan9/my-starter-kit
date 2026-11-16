"use client";

import type { ReactNode } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// 레이아웃 미리보기용 블록
function Block({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`flex items-center justify-center rounded-md border border-dashed bg-muted p-4 text-sm text-muted-foreground ${className}`}
    >
      {children}
    </div>
  );
}

function Pattern({
  title,
  description,
  code,
  children,
}: {
  title: string;
  description: string;
  code: string;
  children: ReactNode;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {children}
        <pre className="overflow-x-auto rounded-md bg-muted p-3 text-xs">{code}</pre>
      </CardContent>
    </Card>
  );
}

// 반응형 레이아웃 패턴 예제
export function LayoutsDemo() {
  return (
    <Tabs defaultValue="grid" className="space-y-4">
      <TabsList>
        <TabsTrigger value="grid">반응형 그리드</TabsTrigger>
        <TabsTrigger value="sidebar">사이드바</TabsTrigger>
        <TabsTrigger value="holy">홀리 그레일</TabsTrigger>
        <TabsTrigger value="stack">스택</TabsTrigger>
      </TabsList>

      <TabsContent value="grid">
        <Pattern
          title="반응형 그리드"
          description="화면 너비에 따라 1 → 2 → 4열로 바뀝니다."
          code={`<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">`}
        >
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
              <Block key={n}>항목 {n}</Block>
            ))}
          </div>
        </Pattern>
      </TabsContent>

      <TabsContent value="sidebar">
        <Pattern
          title="사이드바 + 콘텐츠"
          description="모바일에서는 세로로, md 이상에서는 좌우로 배치됩니다."
          code={`<div className="grid gap-4 md:grid-cols-[200px_1fr]">`}
        >
          <div className="grid gap-4 md:grid-cols-[200px_1fr]">
            <Block className="min-h-32">사이드바</Block>
            <Block className="min-h-32">메인 콘텐츠</Block>
          </div>
        </Pattern>
      </TabsContent>

      <TabsContent value="holy">
        <Pattern
          title="홀리 그레일"
          description="헤더, 좌/중앙/우 3단, 푸터 구성입니다."
          code={`<div className="grid gap-4 lg:grid-cols-[160px_1fr_160px]">`}
        >
          <div className="space-y-4">
            <Block>헤더</Block>
            <div className="grid gap-4 lg:grid-cols-[160px_1fr_160px]">
              <Block className="min-h-24">좌측</Block>
              <Block className="min-h-24">중앙</Block>
              <Block className="min-h-24">우측</Block>
            </div>
            <Block>푸터</Block>
          </div>
        </Pattern>
      </TabsContent>

      <TabsContent value="stack">
        <Pattern
          title="스택 (모바일 세로, 데스크톱 가로)"
          description="flex-col과 md:flex-row로 방향을 전환합니다."
          code={`<div className="flex flex-col gap-4 md:flex-row">`}
        >
          <div className="flex flex-col gap-4 md:flex-row">
            <Block className="flex-1">A</Block>
            <Block className="flex-1">B</Block>
            <Block className="flex-1">C</Block>
          </div>
        </Pattern>
      </TabsContent>
    </Tabs>
  );
}
