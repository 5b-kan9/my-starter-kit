import Link from "next/link";
import { FileQuestion } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/shared/empty-state";

export default function NotFound() {
  return (
    <div className="flex flex-1 items-center justify-center p-6">
      <EmptyState
        icon={FileQuestion}
        title="페이지를 찾을 수 없습니다"
        description="주소가 올바른지 확인해 주세요."
        action={
          <Button render={<Link href="/" />} nativeButton={false}>
            홈으로
          </Button>
        }
      />
    </div>
  );
}
