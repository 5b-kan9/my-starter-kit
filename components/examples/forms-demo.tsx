"use client";

import { Controller, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

const schema = z
  .object({
    name: z.string().min(2, "이름은 2자 이상이어야 합니다."),
    email: z.string().email("올바른 이메일을 입력해 주세요."),
    password: z.string().min(8, "비밀번호는 8자 이상이어야 합니다."),
    confirmPassword: z.string(),
    role: z.string().min(1, "역할을 선택해 주세요."),
    bio: z.string().max(100, "소개는 100자 이하로 입력해 주세요."),
    newsletter: z.boolean(),
    terms: z.boolean().refine((v) => v, "약관에 동의해야 합니다."),
  })
  .refine((v) => v.password === v.confirmPassword, {
    path: ["confirmPassword"],
    message: "비밀번호가 일치하지 않습니다.",
  });

type FormValues = z.infer<typeof schema>;

const roles = [
  { value: "developer", label: "개발자" },
  { value: "designer", label: "디자이너" },
  { value: "pm", label: "기획자" },
];

// react-hook-form + zod 폼 예제
export function FormsDemo() {
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "",
      bio: "",
      newsletter: false,
      terms: false,
    },
  });

  // watch() 대신 useWatch로 값을 구독 (React Compiler 호환)
  const values = useWatch({ control: form.control });

  function onSubmit(data: FormValues) {
    toast.success(`${data.name}님, 제출되었습니다. (샘플)`);
    form.reset();
  }

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>가입 폼</CardTitle>
          <CardDescription>
            제출하면 zod 스키마로 검증하고, 오류는 필드 아래에 표시됩니다.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
            <FieldGroup>
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="demo-name">이름</FieldLabel>
                    <Input
                      {...field}
                      id="demo-name"
                      aria-invalid={fieldState.invalid}
                    />
                    <FieldError errors={[fieldState.error]} />
                  </Field>
                )}
              />
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="demo-email">이메일</FieldLabel>
                    <Input
                      {...field}
                      id="demo-email"
                      type="email"
                      aria-invalid={fieldState.invalid}
                    />
                    <FieldError errors={[fieldState.error]} />
                  </Field>
                )}
              />
              <div className="grid gap-4 sm:grid-cols-2">
                <Controller
                  name="password"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="demo-password">비밀번호</FieldLabel>
                      <Input
                        {...field}
                        id="demo-password"
                        type="password"
                        aria-invalid={fieldState.invalid}
                      />
                      <FieldError errors={[fieldState.error]} />
                    </Field>
                  )}
                />
                <Controller
                  name="confirmPassword"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="demo-confirm">비밀번호 확인</FieldLabel>
                      <Input
                        {...field}
                        id="demo-confirm"
                        type="password"
                        aria-invalid={fieldState.invalid}
                      />
                      <FieldError errors={[fieldState.error]} />
                    </Field>
                  )}
                />
              </div>
              <Controller
                name="role"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>역할</FieldLabel>
                    <Select
                      value={field.value || null}
                      onValueChange={(v) => field.onChange(v ?? "")}
                    >
                      <SelectTrigger aria-invalid={fieldState.invalid}>
                        <SelectValue placeholder="역할 선택">
                          {(v: string | null) =>
                            roles.find((r) => r.value === v)?.label ?? "역할 선택"
                          }
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {roles.map((r) => (
                          <SelectItem key={r.value} value={r.value}>
                            {r.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FieldError errors={[fieldState.error]} />
                  </Field>
                )}
              />
              <Controller
                name="bio"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="demo-bio">소개</FieldLabel>
                    <Textarea
                      {...field}
                      id="demo-bio"
                      aria-invalid={fieldState.invalid}
                    />
                    <FieldDescription>{field.value.length}/100자</FieldDescription>
                    <FieldError errors={[fieldState.error]} />
                  </Field>
                )}
              />
              <Controller
                name="newsletter"
                control={form.control}
                render={({ field }) => (
                  <Field orientation="horizontal">
                    <Switch
                      id="demo-newsletter"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                    <FieldLabel htmlFor="demo-newsletter">뉴스레터 수신</FieldLabel>
                  </Field>
                )}
              />
              <Controller
                name="terms"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field orientation="horizontal" data-invalid={fieldState.invalid}>
                    <Checkbox
                      id="demo-terms"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                    <FieldLabel htmlFor="demo-terms">약관에 동의합니다</FieldLabel>
                    <FieldError errors={[fieldState.error]} />
                  </Field>
                )}
              />
              <div className="flex gap-2">
                <Button type="submit" disabled={form.formState.isSubmitting}>
                  제출
                </Button>
                <Button type="button" variant="outline" onClick={() => form.reset()}>
                  초기화
                </Button>
              </div>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>실시간 값</CardTitle>
          <CardDescription>form.watch()로 관찰한 현재 상태</CardDescription>
        </CardHeader>
        <CardContent>
          <pre className="overflow-x-auto rounded-md bg-muted p-3 text-xs">
            {JSON.stringify({ ...values, password: "***", confirmPassword: "***" }, null, 2)}
          </pre>
        </CardContent>
      </Card>
    </div>
  );
}
