import axios from "axios";
import { MessageSender } from "../presentation/protocols/message";

export class MessageSenderAdapter implements MessageSender {
  private readonly authorizationKey: string
  private readonly OpenAIOrganization: string
  private readonly OpenAIBetaVersion: string

  constructor(authorizationKey: string, OpenAIOrganization: string, OpenAIBetaVersion: string) {
    this.authorizationKey = authorizationKey;
    this.OpenAIOrganization = OpenAIOrganization;
    this.OpenAIBetaVersion = OpenAIBetaVersion
  }

  async send(message: string, threadId: string): Promise<string> {
    const response = await axios.post(`https://api.openai.com/v1/threads/${threadId}/messages`, {
      "role": "user",
      "content": message
    }, {
      headers: {
        'Authorization': `Bearer ${this.authorizationKey}`,
        'Content-Type': 'application/json',
        'OpenAI-Organization': this.OpenAIOrganization,
        'OpenAI-Beta': this.OpenAIBetaVersion
      }
    })
    return response.data.id;
  }
}