import { MissingParamError } from "../errors/missing-param-error"
import { badRequest, ok, serverError } from "../helpers/http-helper"
import { AssistantRunner } from "../protocols/assistant-runner"
import { Controller } from "../protocols/controller"
import { HttpRequest, HttpResponse } from "../protocols/http"
import { MessageGetter } from "../protocols/message-getter"
import { MessageSender } from "../protocols/message-sender"
import { RunStatusChecker } from "../protocols/run-status-checker"
import { ThreadCreator } from "../protocols/thread-creator"

export class SendMessageController implements Controller {

  private readonly threadCreator: ThreadCreator;
  private readonly messageSender: MessageSender;
  private readonly assistantRunner: AssistantRunner;
  private readonly runStatusChecker: RunStatusChecker;
  private readonly messageGetter: MessageGetter;

  constructor(threadCreator: ThreadCreator, messageSender: MessageSender, assistantRunner: AssistantRunner, runStatusChecker: RunStatusChecker, messageGetter: MessageGetter) {
    this.threadCreator = threadCreator;
    this.messageSender = messageSender;
    this.assistantRunner = assistantRunner;
    this.runStatusChecker = runStatusChecker;
    this.messageGetter = messageGetter;
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['message']
      for(const field of requiredFields) {
        if(!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const { message } = httpRequest.body
      let threadId = httpRequest.body.threadId

      if(!threadId) {
        threadId = await this.threadCreator.create()
      }

      const sentMessageId = await this.messageSender.send(message, threadId)

      if(!sentMessageId) {
        return serverError(new Error('Failed to send message to assistant'))
      }

      const runId = await this.assistantRunner.run(threadId);

      let status = '';
      do {
        await new Promise(resolve => setTimeout(resolve, 1000));
        status = await this.runStatusChecker.check(threadId, runId);
        console.log("status:" + status);
      } while (status !== 'completed');

      const receivedMessage = await this.messageGetter.get(threadId);
      return ok({
        receivedMessage,
        threadId
      });
    } catch (error) {
      console.log(error);
      return serverError(error)
    }
  }
}