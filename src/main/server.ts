import { MongoHelper } from "../infra/mongodb/mongo-helper";
import { HttpRequest } from "../presentation/protocols/http";
import { makeApp } from "./config/app";
const { Client } = require('whatsapp-web.js');
import env from "./config/env";
import { makeSendMessageController } from "./factories/send-message";
const app = makeApp();

MongoHelper.connect(env.mongoUrl).then(async () => {
  app.listen(env.port, () => console.log('Server running at http://localhost:3000'))
}).catch(console.error)