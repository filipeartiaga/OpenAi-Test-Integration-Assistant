import axios from "axios";
import { AssistantRunner } from "../presentation/protocols/assistant-runner";

export class AssistantRunnerAdapter implements AssistantRunner {
  private readonly authorizationKey: string
  private readonly OpenAIOrganization: string
  private readonly OpenAIBetaVersion: string
  private readonly assistantId: string

  constructor(authorizationKey: string, OpenAIOrganization: string, OpenAIBetaVersion: string, assistantId: string) {
    this.authorizationKey = authorizationKey;
    this.OpenAIOrganization = OpenAIOrganization;
    this.OpenAIBetaVersion = OpenAIBetaVersion
    this.assistantId = assistantId
  }

  async run(threadId: string): Promise<string> {
    const response = await axios.post(`https://api.openai.com/v1/threads/${threadId}/runs`, {
      "assistant_id": this.assistantId
    }, {
      headers: {
        'Authorization': `Bearer ${this.authorizationKey}`,
        'Content-Type': 'application/json',
        'OpenAI-Organization': this.OpenAIOrganization,
        'OpenAI-Beta': this.OpenAIBetaVersion
      },
    })
    return response.data.id;
  }
}