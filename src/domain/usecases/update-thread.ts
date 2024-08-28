import { ThreadModel } from "../models/thread";

export interface UpdateThread {
  add(thread: ThreadModel): Promise<string>
}
