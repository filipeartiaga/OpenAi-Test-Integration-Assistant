export interface MessageSender {
  send: (message: string, threadId: string) => Promise<string>
}