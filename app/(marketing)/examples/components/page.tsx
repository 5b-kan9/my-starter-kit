import type { Metadata } from "next";
import { ComponentShowcase } from "@/components/examples/component-showcase";
import { ExampleShell } from "@/components/examples/example-shell";

export const metadata: Metadata = { title: "컴포넌트 쇼케이스" };

export default function ComponentShowcasePage() {
  return (
    <ExampleShell
      title="컴포넌트 쇼케이스"
      description="프로젝트에 포함된 UI 컴포넌트의 실제 동작을 확인해보세요."
    >
      <ComponentShowcase />
    </ExampleShell>
  );
}
