import { ChatWidget } from '../../../src/chat-widget/chat-widget'

type EmbedPageProps = {
  params: Promise<{
    botId: string
  }>
}

export default async function EmbedPage({ params }: EmbedPageProps) {
  const { botId } = await params

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-100 p-4">
      <ChatWidget botId={botId} />
    </div>
  )
}
