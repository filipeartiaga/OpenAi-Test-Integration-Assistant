import axios from "axios";
import { AssistantMessageModel } from "../domain/models/assistant-message";
import { MessageGetter } from "../presentation/protocols/message";

export class MessageGetterAdapter implements MessageGetter {
  private readonly authorizationKey: string
  private readonly OpenAIOrganization: string
  private readonly OpenAIBetaVersion: string

  constructor(authorizationKey: string, OpenAIOrganization: string, OpenAIBetaVersion: string, assistantId: string) {
    this.authorizationKey = authorizationKey;
    this.OpenAIOrganization = OpenAIOrganization;
    this.OpenAIBetaVersion = OpenAIBetaVersion
  }

  async get(threadId: string): Promise<AssistantMessageModel> {
    const response = await axios.get(`https://api.openai.com/v1/threads/${threadId}/messages`, {
      headers: {
        'Authorization': `Bearer ${this.authorizationKey}`,
        'Content-Type': 'application/json',
        'OpenAI-Organization': this.OpenAIOrganization,
        'OpenAI-Beta': this.OpenAIBetaVersion
      }
    })
    const message : AssistantMessageModel = {
      id: response.data.data[0].id,
      content: response.data.data[0].content[0].text.value
    };
    return message;
  }
}