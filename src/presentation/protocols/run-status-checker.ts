export interface RunStatusChecker {
  check: (threadId:string, runId: string) => Promise<string>
}