import { MessageModel } from "../../../domain/models/message";
import { AddMessageModel } from "../../../domain/usecases/add-message";
import { MongoHelper } from "../mongo-helper";

export class AddMessageMongoRepository implements AddMessageMongoRepository {
  async add(message: AddMessageModel): Promise<MessageModel> {
    const messageCollection = MongoHelper.getCollection('messages')
    const result = await messageCollection.insertOne(message)
    const newMessage : MessageModel = {
      id: result.ops[0]._id,
      messageId: result.ops[0].messageId,
      sender: result.ops[0].sender,
      content: result.ops[0].content,
      createdAt: result.ops[0].createdAt
    }
    return newMessage;
  }
}