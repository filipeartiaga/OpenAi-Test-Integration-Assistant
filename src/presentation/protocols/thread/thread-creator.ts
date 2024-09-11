export interface ThreadCreator {
  create: () => Promise<string>
}