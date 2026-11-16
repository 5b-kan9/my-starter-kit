import type { Metadata } from "next";
import { ProfileForm } from "@/components/settings/profile-form";
import { PageHeader } from "@/components/shared/page-header";

export const metadata: Metadata = { title: "설정" };

export default function SettingsPage() {
  return (
    <>
      <PageHeader title="설정" description="프로필 정보를 관리합니다." />
      <ProfileForm />
    </>
  );
}
