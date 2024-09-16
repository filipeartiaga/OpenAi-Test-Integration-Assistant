export interface AddThreadModel {
  threadId: string
  phoneNumber: string
  messages: string[]
  createdAt: Date
}

export interface AddThread {
  add(thread: AddThreadModel): Promise<string>
}
