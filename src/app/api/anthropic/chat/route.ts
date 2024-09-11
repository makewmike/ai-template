import { AnthropicStream, StreamingTextResponse } from 'ai';
import { Anthropic } from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export const runtime = 'edge';

export async function POST(req: Request) {
  const { messages } = await req.json();

  const response = await anthropic.completions.create({
    model: 'claude-3-sonnet-20240229',
    prompt: messages.map((m: any) => `${m.role}: ${m.content}`).join('\n'),
    stream: true,
    max_tokens_to_sample: 300,
  });

  const stream = AnthropicStream(response);
  return new StreamingTextResponse(stream);
}
