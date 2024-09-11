import { MessageModel } from "../../../domain/models/message";
import { AddMessageModel } from "../../../domain/usecases/add-message";

export interface MessageAdder {
  add(message: AddMessageModel): Promise<MessageModel>
}