import { Card } from './ui/card'
import { Input } from './ui/input'
import { Button } from './ui/button'

type ChatWidgetProps = {
  title?: string
}

export function ChatWidget({ title = 'Support Chat' }: ChatWidgetProps) {
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
        <article className="mb-auto max-w-[82%] rounded-2xl bg-white p-3">
          안녕하세요. 어떻게 도와드릴까요?
        </article>
      </section>

      <footer className="flex h-[56px] items-center gap-2 border-t border-slate-200 bg-white px-3 py-2">
        <Input placeholder="메시지를 입력하세요" className="flex-1" />
        <Button className="bg-black text-white">전송</Button>
      </footer>
    </Card>
  )
}
