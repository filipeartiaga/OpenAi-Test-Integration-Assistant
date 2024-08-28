import { ThreadModel } from "../../../domain/models/thread";
import { AddThreadModel } from "../../../domain/usecases/add-thread";
import { MongoHelper } from "../mongo-helper";

export class AddThreadMongoRepository implements AddThreadMongoRepository {
  async add(thread: AddThreadModel): Promise<ThreadModel> {
    const threadCollection = MongoHelper.getCollection('threads')
    const result = await threadCollection.insertOne(thread)
    const newThread: ThreadModel = {
      id: result.ops[0]._id,
      threadId: result.ops[0].threadId,
      messages: result.ops[0].messages,
      createdAt: result.ops[0].createdAt
    }
    return newThread
  }
}