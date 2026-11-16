"use client";

import { useCallback, useEffect, useState } from "react";
import { RefreshCw } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface Post {
  id: number;
  title: string;
  author: string;
}

const mockPosts: Post[] = [
  { id: 1, title: "Next.js 16 시작하기", author: "김개발" },
  { id: 2, title: "Tailwind CSS 4 정리", author: "이디자인" },
  { id: 3, title: "react-hook-form과 zod", author: "박폼" },
];

// 모의 API: 지연 후 성공 또는 실패
function fetchPosts(shouldFail: boolean): Promise<Post[]> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) reject(new Error("서버 오류가 발생했습니다. (모의)"));
      else resolve(mockPosts);
    }, 1200);
  });
}

type State =
  | { status: "loading" }
  | { status: "success"; data: Post[] }
  | { status: "error"; message: string };

// 로딩/성공/에러/재시도 상태 관리 예제
export function DataFetchingDemo() {
  const [shouldFail, setShouldFail] = useState(false);
  const [state, setState] = useState<State>({ status: "loading" });
  const [attempt, setAttempt] = useState(0);

  const load = useCallback(() => {
    setState({ status: "loading" });
    setAttempt((n) => n + 1);
  }, []);

  useEffect(() => {
    let cancelled = false;
    fetchPosts(shouldFail)
      .then((data) => {
        if (!cancelled) setState({ status: "success", data });
      })
      .catch((e: Error) => {
        if (!cancelled) setState({ status: "error", message: e.message });
      });
    // 취소 플래그로 경쟁 상태 방지
    return () => {
      cancelled = true;
    };
  }, [attempt, shouldFail]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>게시글 목록</CardTitle>
        <CardDescription>
          모의 API를 호출해 로딩, 성공, 에러 상태를 보여줍니다.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <Button size="sm" onClick={load}>
            <RefreshCw className="size-4" />
            다시 불러오기
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              setShouldFail((v) => !v);
              setState({ status: "loading" });
            }}
          >
            {shouldFail ? "성공 모드로 전환" : "에러 모드로 전환"}
          </Button>
          <Badge variant={shouldFail ? "destructive" : "secondary"}>
            {shouldFail ? "에러 모드" : "성공 모드"}
          </Badge>
        </div>

        {state.status === "loading" && (
          <div className="space-y-3" aria-label="로딩 중" data-testid="loading">
            {[1, 2, 3].map((n) => (
              <Skeleton key={n} className="h-14 w-full" />
            ))}
          </div>
        )}

        {state.status === "error" && (
          <div
            role="alert"
            className="space-y-3 rounded-md border border-destructive/50 p-4 text-sm"
          >
            <p className="text-destructive">{state.message}</p>
            <Button size="sm" variant="outline" onClick={load}>
              재시도
            </Button>
          </div>
        )}

        {state.status === "success" && (
          <ul className="space-y-3">
            {state.data.map((post) => (
              <li key={post.id} className="rounded-md border p-3">
                <p className="font-medium">{post.title}</p>
                <p className="text-sm text-muted-foreground">{post.author}</p>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
