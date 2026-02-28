type RequestBotReplyParams = {
  apiEndpoint: string
  botId: string
  scopeId: string
  message: string
}

export async function requestBotReply(
  params: RequestBotReplyParams
): Promise<string> {
  const response = await fetch(params.apiEndpoint, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      botId: params.botId,
      scopeId: params.scopeId,
      message: params.message,
    }),
  })

  if (!response.ok) {
    throw new Error('query_failed')
  }

  const data = (await response.json()) as { answer?: unknown }
  const answer = typeof data.answer === 'string' ? data.answer.trim() : ''

  if (answer.length === 0) {
    throw new Error('empty_answer')
  }

  return answer
}
