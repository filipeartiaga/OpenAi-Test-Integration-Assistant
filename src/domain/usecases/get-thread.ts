import { ThreadModel } from "../models/thread"

export interface GetThread {
  get(threadId: string): Promise<ThreadModel>
}
