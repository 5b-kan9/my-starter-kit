import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// 조건부 클래스 병합 유틸 (shadcn 표준)
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
