import { useMediaQuery } from "usehooks-ts";

const MOBILE_BREAKPOINT = 768;

// usehooks-ts의 useMediaQuery 기반 (직접 구현 대신 검증된 라이브러리 사용)
export function useIsMobile() {
  return useMediaQuery(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`, {
    initializeWithValue: false,
  });
}
