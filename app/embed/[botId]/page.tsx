import { ChatWidget } from '../../../src/chat-widget/chat-widget'

type EmbedPageProps = {
  params: Promise<{
    botId: string
  }>
}

export default async function EmbedPage({ params }: EmbedPageProps) {
  const { botId } = await params

  return (
    <main className="h-screen w-screen bg-slate-50">
      <ChatWidget botId={botId} />
    </main>
  )
}
