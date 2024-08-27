export interface MessageGetter {
  get: (threadId: string) => Promise<string>
}