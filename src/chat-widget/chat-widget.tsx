'use client'

import { useState } from 'react'
import { Card } from './ui/card'
import { Input } from './ui/input'
import { Button } from './ui/button'

type ChatWidgetProps = {
  title?: string
}

type Message = {
  id: number
  role: 'user' | 'bot'
  text: string
}

function appendMessage(messages: Message[], nextText: string): Message[] {
  const normalized = nextText.trim()

  if (normalized.length === 0) {
    return messages
  }

  return [
    ...messages,
    {
      id: messages.length + 1,
      role: 'user',
      text: normalized,
    },
  ]
}

export function ChatWidget({ title = 'Support Chat' }: ChatWidgetProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')

  const handleSendMessage = () => {
    const nextMessages = appendMessage(messages, inputValue)

    setMessages(nextMessages)
    setInputValue('')
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
                : 'self-start bg-white'
            }`}
          >
            {message.text}
          </article>
        ))}
      </section>

      <form
        onSubmit={(event) => {
          event.preventDefault()
          handleSendMessage()
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
