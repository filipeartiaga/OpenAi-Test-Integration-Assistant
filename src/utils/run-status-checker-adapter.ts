import axios from "axios";
import { RunStatusChecker } from "../presentation/protocols/run-status-checker";

export class RunStatusCheckerAdapter implements RunStatusChecker {
  private readonly authorizationKey: string
  private readonly OpenAIOrganization: string
  private readonly OpenAIBetaVersion: string

  constructor(authorizationKey: string, OpenAIOrganization: string, OpenAIBetaVersion: string) {
    this.authorizationKey = authorizationKey;
    this.OpenAIOrganization = OpenAIOrganization;
    this.OpenAIBetaVersion = OpenAIBetaVersion
  }

  async check(threadId: string, runId: string): Promise<string> {
    try {
      const response = await axios.post(`https://api.openai.com/v1/threads/${threadId}/runs/${runId}`, {}, {
        headers: {
          'Authorization': `Bearer ${this.authorizationKey}`,
          'Content-Type': 'application/json',
          'OpenAI-Organization': this.OpenAIOrganization,
          'OpenAI-Beta': this.OpenAIBetaVersion
        }
      })
      return response.data.status;
    } catch (error) {
      console.log(error.response.data);
    }

  }
}