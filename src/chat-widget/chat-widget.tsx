'use client'

import { useState } from 'react'
import { Card } from './ui/card'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { requestBotReply } from './_apis/request-bot-reply'

export type ChatWidgetProps = {
  title?: string
  apiEndpoint?: string
  botId?: string
  scopeId?: string
}

type Message = {
  id: number
  role: 'user' | 'bot'
  text: string
}

const API_ERROR_REPLY = '지금은 답변을 불러오지 못했어요. 잠시 후 다시 시도해주세요.'
const DEFAULT_API_ENDPOINT = '/api/chat/query'
const DEFAULT_BOT_ID = 'demo-bot'
const DEFAULT_SCOPE_ID = 'default'

function appendMessage(
  messages: Message[],
  role: Message['role'],
  text: string
): Message[] {
  const normalized = text.trim()

  if (normalized.length === 0) {
    return messages
  }

  return [
    ...messages,
    {
      id: messages.length + 1,
      role,
      text: normalized,
    },
  ]
}

export function ChatWidget({
  title = 'Support Chat',
  apiEndpoint = DEFAULT_API_ENDPOINT,
  botId = DEFAULT_BOT_ID,
  scopeId = DEFAULT_SCOPE_ID,
}: ChatWidgetProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')

  const handleSendMessage = async () => {
    const normalizedInput = inputValue.trim()

    if (normalizedInput.length === 0) {
      return
    }

    setMessages((prevMessages) =>
      appendMessage(prevMessages, 'user', normalizedInput)
    )
    setInputValue('')

    try {
      const answer = await requestBotReply({
        apiEndpoint,
        botId,
        scopeId,
        message: normalizedInput,
      })
      setMessages((prevMessages) => appendMessage(prevMessages, 'bot', answer))
    } catch {
      setMessages((prevMessages) =>
        appendMessage(prevMessages, 'bot', API_ERROR_REPLY)
      )
    }
  }

  return (
    <Card className="flex h-[560px] w-[360px] flex-col overflow-hidden bg-slate-50">
      <header className="flex h-14 items-center justify-between bg-black px-4 text-white">
        <span className="font-bold">{title}</span>
        <button
          type="button"
          className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-white/70 bg-transparent text-lg font-bold leading-none text-white"
        >
          ×
        </button>
      </header>

      <section className="flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto bg-slate-100 p-4">
        <article className="self-start max-w-[82%] rounded-2xl bg-white p-3 text-slate-900">
          안녕하세요. 어떻게 도와드릴까요?
        </article>
        {messages.map((message) => (
          <article
            key={message.id}
            className={`max-w-[82%] rounded-2xl p-3 ${
              message.role === 'user'
                ? 'self-end bg-black text-white'
                : 'self-start bg-white text-slate-900'
            }`}
          >
            {message.text}
          </article>
        ))}
      </section>

      <form
        onSubmit={(event) => {
          event.preventDefault()
          void handleSendMessage()
        }}
        className="flex h-[56px] items-center gap-2 border-t border-slate-200 bg-white px-3 py-2"
      >
        <Input
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          placeholder="메시지를 입력하세요"
          className="flex-1"
        />
        <Button type="submit" className="bg-black text-white">
          전송
        </Button>
      </form>
    </Card>
  )
}
