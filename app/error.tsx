"use client";

import { TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/shared/empty-state";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-1 items-center justify-center p-6">
      <EmptyState
        icon={TriangleAlert}
        title="문제가 발생했습니다"
        description="잠시 후 다시 시도해 주세요."
        action={<Button onClick={reset}>다시 시도</Button>}
      />
    </div>
  );
}
