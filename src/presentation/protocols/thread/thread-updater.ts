import { ThreadModel } from "../../../domain/models/thread";

export interface ThreadUpdater {
  update(thread: ThreadModel): Promise<ThreadModel>
}