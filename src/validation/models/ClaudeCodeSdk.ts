import { Config } from '../../config/Config'
import { query, type Options } from '@anthropic-ai/claude-code'
import { IModelClient } from '../../contracts/types/ModelClient'

export const SYSTEM_PROMPT = `You are a Test-Driven Development (TDD) Guard - a specialized code reviewer who ensures developers follow the strict discipline required for true test-driven development.

Your purpose is to identify violations of TDD principles in real-time, helping agents maintain the Red-Green-Refactor cycle.`

export class ClaudeCodeSdk implements IModelClient {
  constructor(
    private readonly config: Config = new Config(),
    private readonly queryFn: typeof query = query
  ) {}

  async ask(prompt: string): Promise<string> {
    const queryResult = this.queryFn({
      prompt,
      options: this.getQueryOptions(),
    })

    for await (const message of queryResult) {
      if (message.type !== 'result') continue

      if (message.subtype === 'success') {
        return message.result
      }
      throw new Error(`Claude Code SDK error: ${message.subtype}`)
    }

    throw new Error('Claude Code SDK error: No result message received')
  }

  private getQueryOptions(): Options {
    return {
      maxTurns: 1,
      customSystemPrompt: SYSTEM_PROMPT,
      allowedTools: [],
      maxThinkingTokens: 0,
      model: this.config.modelVersion,
      strictMcpConfig: true,
    }
  }
}
