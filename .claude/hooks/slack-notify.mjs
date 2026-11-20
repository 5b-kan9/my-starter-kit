// Claude Code 훅 → Slack 웹훅 알림 스크립트
// - PermissionRequest: 권한 요청 알림 (도구 이름 + 실행 내용)
// - Notification(permission_prompt): 권한 요청 알림 (도구 정보 없는 폴백)
// - PostToolUse(Write|Edit): 파일 생성/수정 알림
// - Stop: 작업 완료 알림
// 어떤 경우에도 Claude 동작을 방해하지 않도록 항상 exit 0 으로 종료한다.

import { execFileSync } from "node:child_process";
import { basename, relative, isAbsolute } from "node:path";
import { fileURLToPath } from "node:url";

const MAX_DETAIL_LENGTH = 400;
const MAX_SUMMARY_LENGTH = 600;

// 긴 문자열 자르기
function truncate(text, max = MAX_DETAIL_LENGTH) {
  const value = String(text ?? "").trim();
  return value.length > max ? `${value.slice(0, max)}…` : value;
}

// 코드 블록 안에 넣을 수 있도록 백틱 무력화
function codeBlock(text, max = MAX_DETAIL_LENGTH) {
  return `\`\`\`${truncate(text, max).replaceAll("```", "'''")}\`\`\``;
}

// stdin 전체 읽기
async function readStdin() {
  const chunks = [];
  for await (const chunk of process.stdin) chunks.push(chunk);
  return Buffer.concat(chunks).toString("utf8");
}

// 현재 git 브랜치 (실패 시 빈 문자열)
function getBranch(cwd) {
  try {
    return execFileSync("git", ["branch", "--show-current"], {
      cwd,
      encoding: "utf8",
      timeout: 2000,
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
  } catch {
    return "";
  }
}

// 현재 시각 (한국 시간, HH:mm)
function getTime() {
  return new Intl.DateTimeFormat("ko-KR", {
    timeZone: "Asia/Seoul",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date());
}

// 프로젝트 기준 상대 경로로 변환
function toRelativePath(filePath, cwd) {
  if (!filePath) return "";
  const rel = isAbsolute(filePath) ? relative(cwd, filePath) : filePath;
  return (rel.startsWith("..") ? filePath : rel).replaceAll("\\", "/");
}

// 도구 입력에서 사람이 읽을 수 있는 요약 추출
function describeToolInput(toolName, toolInput = {}, cwd) {
  switch (toolName) {
    case "Bash":
    case "PowerShell":
      return {
        label: "명령어",
        body: codeBlock(toolInput.command),
        note: toolInput.description,
      };
    case "Write":
    case "Edit":
    case "NotebookEdit":
      return { label: "파일", body: `\`${toRelativePath(toolInput.file_path ?? toolInput.notebook_path, cwd)}\`` };
    case "WebFetch":
      return { label: "URL", body: truncate(toolInput.url) };
    case "WebSearch":
      return { label: "검색어", body: truncate(toolInput.query) };
    default: {
      const json = JSON.stringify(toolInput);
      return { label: "입력", body: json && json !== "{}" ? codeBlock(json) : "" };
    }
  }
}

// 공통 헤더 (제목 + 프로젝트/브랜치/시간)
function buildHeader(title, input) {
  const cwd = input.cwd ?? process.cwd();
  const branch = getBranch(cwd);
  const meta = [`📁 ${basename(cwd)}`, branch && `🌿 ${branch}`, `🕐 ${getTime()}`]
    .filter(Boolean)
    .join("  |  ");
  return `${title}\n_${meta}_`;
}

// 이벤트별 Slack 메시지 생성 (알림 대상이 아니면 null)
function buildMessage(input) {
  const cwd = input.cwd ?? process.cwd();

  if (input.hook_event_name === "PermissionRequest") {
    const { label, body, note } = describeToolInput(input.tool_name, input.tool_input, cwd);
    const lines = [
      buildHeader("🔐 *권한 요청*", input),
      `• 도구: \`${input.tool_name}\``,
      note && `• 설명: ${truncate(note, 200)}`,
      body && `• ${label}: ${body}`,
    ];
    return lines.filter(Boolean).join("\n");
  }

  if (input.hook_event_name === "Notification") {
    // permission_prompt 외 알림은 무시
    if (input.notification_type && input.notification_type !== "permission_prompt") {
      return null;
    }
    return `${buildHeader("🔐 *권한 요청*", input)}\n${truncate(input.message || "Claude가 권한을 요청합니다.")}`;
  }

  if (input.hook_event_name === "PostToolUse") {
    // 파일 생성/수정 도구만 알림
    if (!["Write", "Edit"].includes(input.tool_name)) return null;
    const toolInput = input.tool_input ?? {};
    const filePath = toRelativePath(toolInput.file_path, cwd);
    const title = input.tool_name === "Write" ? "📝 *파일 생성/덮어쓰기*" : "✏️ *파일 수정*";
    const lines = [buildHeader(title, input), `• 파일: \`${filePath}\``];
    if (input.tool_name === "Write") {
      const lineCount = String(toolInput.content ?? "").split("\n").length;
      lines.push(`• 크기: ${lineCount}줄`);
    } else {
      lines.push(`• 변경 전: ${codeBlock(toolInput.old_string, 150)}`);
      lines.push(`• 변경 후: ${codeBlock(toolInput.new_string, 150)}`);
    }
    return lines.join("\n");
  }

  if (input.hook_event_name === "Stop") {
    // 스톱 훅에 의한 연속 실행 중에는 중복 알림 방지
    if (input.stop_hook_active) return null;
    const summary = truncate(input.last_assistant_message, MAX_SUMMARY_LENGTH);
    return `${buildHeader("✅ *작업 완료*", input)}${summary ? `\n${summary}` : ""}`;
  }

  return null;
}

async function main() {
  // 프로젝트 루트의 .env 로드 (이미 설정된 환경변수는 덮어쓰지 않음, 파일 없으면 무시)
  try {
    process.loadEnvFile(fileURLToPath(new URL("../../.env", import.meta.url)));
  } catch {}

  const webhookUrl = process.env.SLACK_WEBHOOK_URL;
  if (!webhookUrl) return; // 웹훅 미설정 시 조용히 종료

  const raw = await readStdin();
  const input = raw.trim() ? JSON.parse(raw) : {};
  const text = buildMessage(input);
  if (!text) return;

  await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({ text }),
    signal: AbortSignal.timeout(5000),
  });
}

// process.exit()는 Windows에서 libuv 핸들 충돌을 일으키므로 exitCode로 자연 종료
process.exitCode = 0;
main().catch(() => {}); // 모든 오류 무시
