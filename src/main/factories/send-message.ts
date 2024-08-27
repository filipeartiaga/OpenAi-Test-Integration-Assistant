import { SendMessageController } from "../../presentation/controllers/send-message";
import { AssistantRunnerAdapter } from "../../utils/assistant-runner-adapter";
import { MessageGetterAdapter } from "../../utils/message-getter-adapter";
import { MessageSenderAdapter } from "../../utils/message-sender-adapter";
import { RunStatusCheckerAdapter } from "../../utils/run-status-checker-adapter";
import { ThreadCreatorAdapter } from "../../utils/thread-creator-adapter";
import env from "../config/env";

export const makeSendMessageController = (): SendMessageController => {
  const authorizationKey = env.authorizationKey;
  const OpenAIOrganization = env.OpenAIOrganization;
  const OpenAIBetaVersion = env.OpenAIBetaVersion;

  const threadCreatorAdapter = new ThreadCreatorAdapter(authorizationKey, OpenAIOrganization, OpenAIBetaVersion);
  const messageSenderAdapter = new MessageSenderAdapter(authorizationKey, OpenAIOrganization, OpenAIBetaVersion);
  const assistantRunnerAdapter = new AssistantRunnerAdapter(authorizationKey, OpenAIOrganization, OpenAIBetaVersion, env.assistantId);
  const runStatusCheckerAdapter = new RunStatusCheckerAdapter(authorizationKey, OpenAIOrganization, OpenAIBetaVersion);
  const messageGetterAdapter = new MessageGetterAdapter(authorizationKey, OpenAIOrganization, OpenAIBetaVersion, env.assistantId);

  return new SendMessageController(threadCreatorAdapter, messageSenderAdapter, assistantRunnerAdapter, runStatusCheckerAdapter, messageGetterAdapter);
}