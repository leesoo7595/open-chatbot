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

## JavaScript SDK 사용

패키지 publish 후 기본 사용 예시:

```ts
import { initChatWidget } from 'open-chatbot'

const widget = initChatWidget({
  host: 'https://chat.yourservice.com',
  botId: 'demo-bot',
})

widget?.open()
```

옵션:
- `host?: string`
- `botId?: string`

반환값:
- `open()`
- `close()`
- `toggle()`
- `destroy()`

## Script 1줄 임베드

```html
<script src="https://cdn.yourservice.com/widget/v1/widget.js" data-host="https://chat.yourservice.com" data-bot-id="demo-bot"></script>
```

서빙 전략:
- 기본(권장): Managed CDN 고정 경로
  - `https://cdn.yourservice.com/widget/v1/widget.js`
- 대안(Self-host): `npm run build:sdk` 후 `dist/widget.js`를 정적 호스팅 경로에 업로드
- 로컬 Next 테스트:
  - `npm run prepare:widget-local`
  - `public/widget.js`가 생성되며 `http://localhost:3000/widget-test.html`에서 확인

지원 `data-*` 옵션:
- `data-host` iframe 소스 호스트
- `data-bot-id` bot 식별자

동작:
- 초기에는 우하단 플로팅 버튼(`Chat`)만 표시
- 버튼 클릭 시 iframe 열기/닫기 토글

## React Component 사용

패키지 publish 후 기본 사용 예시:

```tsx
import { ChatWidget } from 'open-chatbot/react'

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
import { ChatWidget } from 'open-chatbot/react'

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
npm run build:sdk
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
