import { NextResponse } from 'next/server'
import { z } from 'zod'

const chatQuerySchema = z.object({
  botId: z.string().trim().min(1),
  scopeId: z.string().trim().min(1),
  message: z.string().trim().min(1),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const parsed = chatQuerySchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: 'invalid_request',
          message: 'botId, scopeId, and message are required.',
        },
        { status: 400 },
      )
    }
  } catch {
    return NextResponse.json(
      {
        error: 'invalid_json',
        message: 'Request body must be valid JSON.',
      },
      { status: 400 },
    )
  }

  return NextResponse.json(
    {
      answer: 'Temporary response from chat query API.',
      references: [],
      fallbackReason: null,
    },
    { status: 200 },
  )
}
