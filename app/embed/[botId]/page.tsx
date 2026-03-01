import { ChatWidget } from '../../../src/chat-widget/chat-widget'

type EmbedPageProps = {
  params: Promise<{
    botId: string
  }>
}

export default async function EmbedPage({ params }: EmbedPageProps) {
  const { botId } = await params

  return <ChatWidget botId={botId} />
}
