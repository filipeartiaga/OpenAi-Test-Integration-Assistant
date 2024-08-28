import { ThreadModel } from "../../../domain/models/thread";
import { MongoHelper } from "../mongo-helper";

export class UpdateThreadMongoRepository implements UpdateThreadMongoRepository {
  async update(thread: ThreadModel): Promise<ThreadModel> {
    const threadCollection = await MongoHelper.getCollection('threads')
    const result = await threadCollection.findOneAndUpdate(
      { _id: thread.id },
      {
        $set: {
          messages: thread.messages,
        }
      },
      { returnDocument: 'after' }
    )
    const newThread: ThreadModel = {
      id: result.value._id,
      threadId: result.value.threadId,
      messages: result.value.messages,
      createdAt: result.value.createdAt
    }
    return newThread
  }
}