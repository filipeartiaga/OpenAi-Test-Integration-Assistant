import { ThreadModel } from "../../../domain/models/thread"

export interface ThreadGetter {
  getByThreadId(threadId: string): Promise<ThreadModel>
  getByPhoneNumber(phoneNumber: string): Promise<ThreadModel>
}
