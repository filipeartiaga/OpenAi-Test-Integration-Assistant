import { ThreadModel } from "../../../domain/models/thread";
import { MongoHelper } from "../mongo-helper";

export class GetThreadMongoRepository implements GetThreadMongoRepository {
  async getByThreadId(threadId: string): Promise<ThreadModel> {
    const threadCollection = MongoHelper.getCollection('threads')
    const thread = await threadCollection.findOne({ threadId: threadId })
    if(!thread) return null
    const newThread: ThreadModel = {
      id: thread._id,
      phoneNumber: thread.phoneNumber,
      threadId: thread.threadId,
      messages: thread.messages,
      createdAt: thread.createdAt
    }
    return newThread
  }

  async getByPhoneNumber(phoneNumber: string): Promise<ThreadModel> {
    const threadCollection = MongoHelper.getCollection('threads')
    const thread = await threadCollection.findOne({ phoneNumber: phoneNumber })
    if(!thread) return null
    const newThread: ThreadModel = {
      id: thread._id,
      phoneNumber: thread.phoneNumber,
      threadId: thread.threadId,
      messages: thread.messages,
      createdAt: thread.createdAt
    }
    return newThread
  }
}

/*
  getByThreadId(threadId: string): Promise<ThreadModel>
  getByPhoneNumber(phoneNumber: string): Promise<ThreadModel>
*/