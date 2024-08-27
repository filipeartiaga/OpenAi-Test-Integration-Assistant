import axios from "axios";
import { AssistantRunner } from "../presentation/protocols/assistant-runner";
import { MessageGetter } from "../presentation/protocols/message-getter";

export class MessageGetterAdapter implements MessageGetter {
  private readonly authorizationKey: string
  private readonly OpenAIOrganization: string
  private readonly OpenAIBetaVersion: string

  constructor(authorizationKey: string, OpenAIOrganization: string, OpenAIBetaVersion: string, assistantId: string) {
    this.authorizationKey = authorizationKey;
    this.OpenAIOrganization = OpenAIOrganization;
    this.OpenAIBetaVersion = OpenAIBetaVersion
  }

  async get(threadId: string): Promise<any> {
    const response = await axios.get(`https://api.openai.com/v1/threads/${threadId}/messages`, {
      headers: {
        'Authorization': `Bearer ${this.authorizationKey}`,
        'Content-Type': 'application/json',
        'OpenAI-Organization': this.OpenAIOrganization,
        'OpenAI-Beta': this.OpenAIBetaVersion
      }
    })
    return response.data.data[0].content[0].text.value;
  }
}