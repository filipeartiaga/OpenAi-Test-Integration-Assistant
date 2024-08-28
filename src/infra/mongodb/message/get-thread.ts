import { ThreadModel } from "../../../domain/models/thread";
import { MongoHelper } from "../mongo-helper";

export class GetThreadMongoRepository implements GetThreadMongoRepository {
  async get(threadId: string): Promise<ThreadModel> {
    const threadCollection = MongoHelper.getCollection('threads')
    const thread = await threadCollection.findOne({ threadId: threadId })
    if(!thread) return null
    const newThread: ThreadModel = {
      id: thread._id,
      threadId: thread.threadId,
      messages: thread.messages,
      createdAt: thread.createdAt
    }
    return newThread
  }
}