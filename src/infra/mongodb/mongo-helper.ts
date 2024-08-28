import { MongoClient } from 'mongodb';

export const MongoHelper = {
  client: MongoClient,

  async connect(url: string): Promise<void> {
    this.client = await MongoClient.connect(url, {
      useUnifiedTopology: true
    });
  },

  async disconnect() {
    await this.client.close()
  },

  getCollection(name: string) {
    return this.client.db().collection(name)
  },


}