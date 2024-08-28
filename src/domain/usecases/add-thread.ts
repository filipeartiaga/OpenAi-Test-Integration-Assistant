export interface AddThreadModel {
  threadId: string
  messages: string[]
  createdAt: Date
}

export interface AddThread {
  add(thread: AddThreadModel): Promise<string>
}
