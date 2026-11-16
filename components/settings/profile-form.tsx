"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const schema = z.object({
  name: z.string().min(2, "이름은 2자 이상이어야 합니다."),
  bio: z.string().max(160, "소개는 160자 이내로 입력해 주세요."),
});

type ProfileValues = z.infer<typeof schema>;

export function ProfileForm() {
  const form = useForm<ProfileValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", bio: "" },
  });

  function onSubmit() {
    toast.success("프로필이 저장되었습니다. (샘플)");
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} noValidate className="max-w-md">
      <FieldGroup>
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="profile-name">이름</FieldLabel>
              <Input {...field} id="profile-name" aria-invalid={fieldState.invalid} />
              <FieldError errors={[fieldState.error]} />
            </Field>
          )}
        />
        <Controller
          name="bio"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="profile-bio">소개</FieldLabel>
              <Textarea {...field} id="profile-bio" aria-invalid={fieldState.invalid} />
              <FieldDescription>최대 160자까지 입력할 수 있습니다.</FieldDescription>
              <FieldError errors={[fieldState.error]} />
            </Field>
          )}
        />
        <Button type="submit" className="w-fit">
          저장
        </Button>
      </FieldGroup>
    </form>
  );
}
