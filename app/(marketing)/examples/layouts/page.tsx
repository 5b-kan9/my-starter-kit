import type { Metadata } from "next";
import { ExampleShell } from "@/components/examples/example-shell";
import { LayoutsDemo } from "@/components/examples/layouts-demo";

export const metadata: Metadata = { title: "레이아웃 예제" };

export default function Page() {
  return (
    <ExampleShell title="레이아웃 예제" description="반응형 레이아웃 패턴을 탭으로 전환하며 확인하세요.">
      <LayoutsDemo />
    </ExampleShell>
  );
}
