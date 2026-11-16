import type { Metadata } from "next";
import { ExampleShell } from "@/components/examples/example-shell";
import { HooksDemo } from "@/components/examples/hooks-demo";

export const metadata: Metadata = { title: "usehooks-ts 예제" };

export default function Page() {
  return (
    <ExampleShell title="usehooks-ts 예제" description="usehooks-ts 훅의 실제 동작을 확인해 보세요.">
      <HooksDemo />
    </ExampleShell>
  );
}
