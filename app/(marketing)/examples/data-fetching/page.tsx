import type { Metadata } from "next";
import { ExampleShell } from "@/components/examples/example-shell";
import { DataFetchingDemo } from "@/components/examples/data-fetching-demo";

export const metadata: Metadata = { title: "데이터 페칭" };

export default function Page() {
  return (
    <ExampleShell title="데이터 페칭" description="로딩, 성공, 에러, 재시도 상태를 다루는 예제입니다.">
      <DataFetchingDemo />
    </ExampleShell>
  );
}
