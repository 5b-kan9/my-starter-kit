"use client";

import type { ReactNode } from "react";
import { toast } from "sonner";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// 섹션 공통 래퍼
function Section({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="flex flex-wrap items-center gap-3">
        {children}
      </CardContent>
    </Card>
  );
}

// 컴포넌트 쇼케이스: 주요 UI 컴포넌트를 한 화면에서 확인
export function ComponentShowcase() {
  return (
    <div className="space-y-6">
      <Section title="버튼" description="variant와 size 조합">
        <Button>기본</Button>
        <Button variant="secondary">보조</Button>
        <Button variant="outline">아웃라인</Button>
        <Button variant="ghost">고스트</Button>
        <Button variant="destructive">삭제</Button>
        <Button variant="link">링크</Button>
        <Separator orientation="vertical" className="h-6" />
        <Button size="xs">XS</Button>
        <Button size="sm">SM</Button>
        <Button size="lg">LG</Button>
        <Button disabled>비활성</Button>
      </Section>

      <Section title="배지">
        <Badge>기본</Badge>
        <Badge variant="secondary">보조</Badge>
        <Badge variant="outline">아웃라인</Badge>
        <Badge variant="destructive">경고</Badge>
      </Section>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>입력 폼</CardTitle>
            <CardDescription>Input, Textarea, Checkbox, Switch</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="sc-email">이메일</Label>
              <Input id="sc-email" type="email" placeholder="you@example.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sc-bio">소개</Label>
              <Textarea id="sc-bio" placeholder="자기소개를 입력하세요" />
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="sc-terms" />
              <Label htmlFor="sc-terms">약관에 동의합니다</Label>
            </div>
            <div className="flex items-center gap-2">
              <Switch id="sc-notify" />
              <Label htmlFor="sc-notify">알림 받기</Label>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>탭</CardTitle>
            <CardDescription>콘텐츠를 탭으로 전환</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="overview">
              <TabsList>
                <TabsTrigger value="overview">개요</TabsTrigger>
                <TabsTrigger value="usage">사용법</TabsTrigger>
                <TabsTrigger value="api">API</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="text-sm">
                컴포넌트의 전체적인 소개를 보여줍니다.
              </TabsContent>
              <TabsContent value="usage" className="text-sm">
                import 후 JSX에서 바로 사용할 수 있습니다.
              </TabsContent>
              <TabsContent value="api" className="text-sm">
                각 컴포넌트가 받는 props를 확인하세요.
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="text-xs text-muted-foreground">
            shadcn/ui 기반
          </CardFooter>
        </Card>
      </div>

      <Section title="오버레이 · 피드백" description="다이얼로그, 토스트, 툴팁">
        <Dialog>
          <DialogTrigger render={<Button variant="outline" />}>
            다이얼로그 열기
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>다이얼로그 제목</DialogTitle>
              <DialogDescription>
                모달 형태로 중요한 내용을 안내할 때 사용합니다.
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
        <Button variant="outline" onClick={() => toast.success("저장되었습니다")}>
          토스트 표시
        </Button>
        <Tooltip>
          <TooltipTrigger render={<Button variant="ghost" />}>툴팁</TooltipTrigger>
          <TooltipContent>도움말 메시지</TooltipContent>
        </Tooltip>
      </Section>

      <Section title="아바타 · 스켈레톤">
        <Avatar>
          <AvatarFallback>김</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarFallback>이</AvatarFallback>
        </Avatar>
        <Separator orientation="vertical" className="h-6" />
        <div className="flex items-center gap-3">
          <Skeleton className="size-10 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-3 w-40" />
            <Skeleton className="h-3 w-28" />
          </div>
        </div>
      </Section>
    </div>
  );
}
