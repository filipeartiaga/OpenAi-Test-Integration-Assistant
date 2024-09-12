import { AssistantMessageModel } from "../../../domain/models/assistant-message";

export interface MessageGetter {
  get: (threadId: string) => Promise<AssistantMessageModel>
}