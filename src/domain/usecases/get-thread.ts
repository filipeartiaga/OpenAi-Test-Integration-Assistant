import { ThreadModel } from "../models/thread"

export interface GetThread {
  getByThreadId(threadId: string): Promise<ThreadModel>
  getByPhoneNumber(phoneNumber: string): Promise<ThreadModel>
}
