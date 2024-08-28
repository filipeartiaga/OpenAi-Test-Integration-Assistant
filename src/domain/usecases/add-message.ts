export interface AddMessageModel {
  messageId: string
  sender: string
  content: string
  createdAt: Date
}

export interface AddMessage {
  add(message: AddMessageModel): Promise<string>
}