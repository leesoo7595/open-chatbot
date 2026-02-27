import { ChatWidget } from '../src/chat-widget/chat-widget'

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-100 p-8">
      <ChatWidget />
    </div>
  )
}
