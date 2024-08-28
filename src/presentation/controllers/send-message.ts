import { ThreadModel } from "../../domain/models/thread"
import { AddMessageModel } from "../../domain/usecases/add-message"
import { AddThreadModel } from "../../domain/usecases/add-thread"
import { MissingParamError } from "../errors/missing-param-error"
import { badRequest, ok, serverError } from "../helpers/http-helper"
import { AssistantRunner } from "../protocols/assistant-runner"
import { Controller } from "../protocols/controller"
import { HttpRequest, HttpResponse } from "../protocols/http"
import { MessageAdder } from "../protocols/message-adder"
import { MessageGetter } from "../protocols/message-getter"
import { MessageSender } from "../protocols/message-sender"
import { RunStatusChecker } from "../protocols/run-status-checker"
import { ThreadAdder } from "../protocols/thread-adder"
import { ThreadCreator } from "../protocols/thread-creator"
import { ThreadGetter } from "../protocols/thread-getter"
import { ThreadUpdater } from "../protocols/thread-updater"

export class SendMessageController implements Controller {

  private readonly threadCreator: ThreadCreator;
  private readonly messageSender: MessageSender;
  private readonly assistantRunner: AssistantRunner;
  private readonly runStatusChecker: RunStatusChecker;
  private readonly messageGetter: MessageGetter;
  private readonly messageAdder: MessageAdder;
  private readonly threadGetter: ThreadGetter;
  private readonly threadAdder: ThreadAdder;
  private readonly threadUpdater: ThreadUpdater;


  constructor(threadCreator: ThreadCreator, messageSender: MessageSender, assistantRunner: AssistantRunner,
    runStatusChecker: RunStatusChecker, messageGetter: MessageGetter, messageAdder: MessageAdder, threadGetter: ThreadGetter,
    threadAdder: ThreadAdder, threadUpdater: ThreadUpdater) {
    this.threadCreator = threadCreator;
    this.messageSender = messageSender;
    this.assistantRunner = assistantRunner;
    this.runStatusChecker = runStatusChecker;
    this.messageGetter = messageGetter;
    this.messageAdder = messageAdder;
    this.threadGetter = threadGetter;
    this.threadAdder = threadAdder;
    this.threadUpdater = threadUpdater;
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['message']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const { message } = httpRequest.body
      let threadId = httpRequest.body.threadId

      if (!threadId) {
        threadId = await this.threadCreator.create()
      }

      const sentMessageId = await this.messageSender.send(message, threadId)

      if (!sentMessageId) {
        return serverError(new Error('Failed to send message to assistant'))
      }

      const runId = await this.assistantRunner.run(threadId);

      let status = '';
      do {
        await new Promise(resolve => setTimeout(resolve, 5000));
        status = await this.runStatusChecker.check(threadId, runId);
        console.log("status:" + status);
      } while (status !== 'completed');

      const receivedMessage = await this.messageGetter.get(threadId);
      const now = Date.now();

      const sentMessage: AddMessageModel = {
        messageId: sentMessageId,
        sender: 'user',
        content: message,
        createdAt: new Date(now)
      }
      const sentMessageData = await this.messageAdder.add(sentMessage);

      const receivedMessageModel: AddMessageModel = {
        messageId: receivedMessage.id,
        sender: 'assistant',
        content: receivedMessage.content,
        createdAt: new Date(now)
      }
      const receivedMessageData = await this.messageAdder.add(receivedMessageModel);

      const threadInDatabase = await this.threadGetter.get(threadId);

      if (!threadInDatabase) {
        const threadData: AddThreadModel = {
          threadId,
          messages: [sentMessageData.id, receivedMessageData.id],
          createdAt: new Date(now),
        }
        await this.threadAdder.add(threadData);
      } else {
        console.log("updating: ", threadInDatabase);
        threadInDatabase.messages.push(sentMessageData.id);
        threadInDatabase.messages.push(receivedMessageData.id);
        const thread = await this.threadUpdater.update(threadInDatabase);
        console.log(thread);
      }

      return ok({
        receivedMessage,
        threadId
      });
    } catch (error) {
      console.log("error: ", error);
      return serverError(error)
    }
  }
}