"use client";

import type { ReactNode } from "react";
import {
  useCopyToClipboard,
  useCounter,
  useDebounceValue,
  useLocalStorage,
  useMediaQuery,
  useToggle,
} from "usehooks-ts";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

function HookCard({
  name,
  description,
  children,
}: {
  name: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-mono text-base">{name}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">{children}</CardContent>
    </Card>
  );
}

function CounterDemo() {
  const { count, increment, decrement, reset } = useCounter(0);
  return (
    <HookCard name="useCounter" description="숫자 증감과 초기화">
      <p className="text-3xl font-bold" data-testid="counter-value">
        {count}
      </p>
      <div className="flex gap-2">
        <Button size="sm" onClick={decrement}>
          -1
        </Button>
        <Button size="sm" onClick={increment}>
          +1
        </Button>
        <Button size="sm" variant="outline" onClick={reset}>
          초기화
        </Button>
      </div>
    </HookCard>
  );
}

function ToggleDemo() {
  const [on, toggle] = useToggle(false);
  return (
    <HookCard name="useToggle" description="불리언 값 전환">
      <div className="flex items-center gap-3">
        <Switch checked={on} onCheckedChange={() => toggle()} aria-label="토글" />
        <Badge variant={on ? "default" : "secondary"}>{on ? "ON" : "OFF"}</Badge>
      </div>
    </HookCard>
  );
}

function LocalStorageDemo() {
  const [name, setName, removeName] = useLocalStorage("example-name", "", {
    initializeWithValue: false,
  });
  return (
    <HookCard
      name="useLocalStorage"
      description="새로고침해도 값이 유지됩니다."
    >
      <Input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="이름을 입력하세요"
        aria-label="저장할 이름"
      />
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>저장된 값: {name || "(없음)"}</span>
        <Button size="xs" variant="outline" onClick={removeName}>
          삭제
        </Button>
      </div>
    </HookCard>
  );
}

function DebounceDemo() {
  const [text, setText] = useDebounceValue("", 500);
  return (
    <HookCard name="useDebounceValue" description="입력을 500ms 지연해서 반영">
      <Input
        onChange={(e) => setText(e.target.value)}
        placeholder="입력해 보세요"
        aria-label="디바운스 입력"
      />
      <p className="text-sm text-muted-foreground">
        디바운스된 값: {text || "(없음)"}
      </p>
    </HookCard>
  );
}

function MediaQueryDemo() {
  const isDesktop = useMediaQuery("(min-width: 768px)", {
    initializeWithValue: false,
  });
  return (
    <HookCard name="useMediaQuery" description="화면 너비를 감지합니다.">
      <Badge variant={isDesktop ? "default" : "secondary"}>
        {isDesktop ? "데스크톱 (768px 이상)" : "모바일 (768px 미만)"}
      </Badge>
      <p className="text-sm text-muted-foreground">창 크기를 바꿔 보세요.</p>
    </HookCard>
  );
}

function CopyDemo() {
  const [copied, copy] = useCopyToClipboard();
  const text = "npm install usehooks-ts";
  return (
    <HookCard name="useCopyToClipboard" description="클립보드에 텍스트 복사">
      <code className="block rounded-md bg-muted p-2 text-sm">{text}</code>
      <div className="flex items-center gap-2">
        <Button
          size="sm"
          onClick={async () => {
            const ok = await copy(text);
            if (ok) toast.success("복사되었습니다.");
            else toast.error("복사에 실패했습니다.");
          }}
        >
          복사
        </Button>
        {copied && <span className="text-xs text-muted-foreground">복사됨</span>}
      </div>
    </HookCard>
  );
}

// usehooks-ts 훅 예제 모음
export function HooksDemo() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <CounterDemo />
      <ToggleDemo />
      <LocalStorageDemo />
      <DebounceDemo />
      <MediaQueryDemo />
      <CopyDemo />
    </div>
  );
}
