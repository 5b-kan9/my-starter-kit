import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

// 마케팅 레이아웃: 헤더 + 본문 + 푸터
export default function MarketingLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
