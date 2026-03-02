# Open Chatbot

범용 챗봇 위젯 SDK + 호스팅 예제(Next.js) 저장소입니다.

현재 구조는 다음처럼 분리되어 있습니다.
- SDK 코드: `src/chat-widget/*`
- 호스트 API 예제: `app/api/chat/query/route.ts`
- iframe 호스트 페이지: `app/embed/[botId]/page.tsx`
- script 임베드 소스: `src/chat-widget/_scripts/*`

## Quick Start

개발 서버 실행:

```bash
npm run dev
```

위젯 테스트 페이지:
- `http://localhost:3000/widget-test.html`

iframe 페이지 직접 확인:
- `http://localhost:3000/embed/demo-bot`

## React SDK 사용

패키지 publish 후 기본 사용 예시:

```tsx
import { ChatWidget } from 'open-chatbot'

export default function App() {
  return <ChatWidget botId="demo-bot" scopeId="default" />
}
```

`ChatWidgetProps`:
- `title?: string`
- `apiEndpoint?: string` (기본값: `/api/chat/query`)
- `botId?: string` (기본값: `demo-bot`)
- `scopeId?: string` (기본값: `default`)
- `onSend?: (params) => Promise<string>`

`onSend`를 넘기면 기본 HTTP 요청 대신 커스텀 transport를 사용할 수 있습니다.

```tsx
import { ChatWidget } from 'open-chatbot'

export default function App() {
  return (
    <ChatWidget
      botId="demo-bot"
      scopeId="default"
      onSend={async ({ message }) => `Echo: ${message}`}
    />
  )
}
```

## Script 1줄 임베드

```html
<script src="https://cdn.yourservice.com/widget/v1/widget.js" data-host="https://chat.yourservice.com" data-bot-id="demo-bot"></script>
```

서빙 전략:
- 기본(권장): Managed CDN 고정 경로
  - `https://cdn.yourservice.com/widget/v1/widget.js`
- 로컬/호스트 빠른 확인: `public/widget.js` 경로 사용
  - 예: `http://localhost:3000/widget.js`
- 대안(Self-host): `npm run build:sdk` 후 `dist/widget.js`를 정적 호스팅 경로에 업로드

지원 `data-*` 옵션:
- `data-host` iframe 소스 호스트
- `data-bot-id` bot 식별자
- `data-width` iframe 폭 (기본 `360`)
- `data-height` iframe 높이 (기본 `560`)
- `data-z-index` 레이어 순서 (기본 `9999`)
- `data-position` 버튼 위치 (`right` 또는 `left`, 기본 `right`)
- `data-offset-x` 가로 오프셋 (기본 `24`)
- `data-offset-y` 세로 오프셋 (기본 `24`)
- `data-theme-color` 버튼 배경색 (기본 `#111111`)

동작:
- 초기에는 우하단 플로팅 버튼(`Chat`)만 표시
- 버튼 클릭 시 iframe 열기/닫기 토글

## 호스트 API 계약

기본 HTTP 경로:
- `POST /api/chat/query`

요청 JSON:

```json
{
  "botId": "demo-bot",
  "scopeId": "default",
  "message": "안녕"
}
```

정상 응답 예시:

```json
{
  "answer": "Temporary response from chat query API.",
  "references": [],
  "fallbackReason": null
}
```

에러 응답:
- `400 invalid_json`
- `400 invalid_request` (`botId`, `scopeId`, `message` 필수)

## Build

SDK 타입/출력 빌드:

```bash
npm run build:widget
```

생성 파일:
- `dist/index.mjs`
- `dist/index.js`
- `dist/index.d.ts`
- `dist/widget.js`

애플리케이션 빌드:

```bash
npm run build
```
