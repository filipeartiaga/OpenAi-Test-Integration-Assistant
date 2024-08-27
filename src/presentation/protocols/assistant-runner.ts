export interface AssistantRunner {
  run: (threadId: string) => Promise<string>
}