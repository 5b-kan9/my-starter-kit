import type { Metadata } from "next";
import { ExampleShell } from "@/components/examples/example-shell";
import { FormsDemo } from "@/components/examples/forms-demo";

export const metadata: Metadata = { title: "폼 예제" };

export default function Page() {
  return (
    <ExampleShell title="폼 예제" description="react-hook-form과 zod로 만든 검증 폼 예제입니다.">
      <FormsDemo />
    </ExampleShell>
  );
}
