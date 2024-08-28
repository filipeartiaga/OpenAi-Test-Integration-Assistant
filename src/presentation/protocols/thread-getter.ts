import { ThreadModel } from "../../domain/models/thread";

export interface ThreadGetter {
  get(threadId: string): Promise<ThreadModel>
}
