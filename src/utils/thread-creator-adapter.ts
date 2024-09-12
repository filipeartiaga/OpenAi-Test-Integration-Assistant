import axios from "axios";
import { ThreadCreator } from "../presentation/protocols/thread";

export class ThreadCreatorAdapter implements ThreadCreator {
  private readonly authorizationKey: string
  private readonly OpenAIOrganization: string
  private readonly OpenAIBetaVersion: string

  constructor(authorizationKey: string, OpenAIOrganization: string, OpenAIBetaVersion: string) {
    this.authorizationKey = authorizationKey;
    this.OpenAIOrganization = OpenAIOrganization;
    this.OpenAIBetaVersion = OpenAIBetaVersion
  }

  async create(): Promise<string> {
    try {
      const response = await axios.post('https://api.openai.com/v1/threads', {}, {
        headers: {
          'Authorization': `Bearer ${this.authorizationKey}`,
          'OpenAI-Organization': this.OpenAIOrganization,
          'OpenAI-Beta': this.OpenAIBetaVersion
        }
      })
      return response.data.id;
    } catch (error) {
      console.log(error.response.data); 
    }
  }
}