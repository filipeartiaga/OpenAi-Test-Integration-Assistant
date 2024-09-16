import { MongoHelper } from "../infra/mongodb/mongo-helper";
import { HttpRequest } from "../presentation/protocols/http";
import { makeApp } from "./config/app";
const { Client } = require('whatsapp-web.js');
import env from "./config/env";
import { makeSendMessageController } from "./factories/send-message";
const app = makeApp();

MongoHelper.connect(env.mongoUrl).then(async () => {
  const qrcode = require('qrcode-terminal');
  const client = new Client();

  client.on('ready', () => {
    console.log('Client is ready!');
  });

  client.on('qr', (qr: any) => {
    qrcode.generate(qr, { small: true });
  });

  client.on('message_create', async message => {
    console.log(message);
    
    const httpRequest: HttpRequest = {
      headers: undefined,
      body: {
        message: message.body,
        phoneNumber: message.from
      },
      params: undefined
    }

    const response = await makeSendMessageController().handle(httpRequest);
    client.sendMessage(message.from, response.body.receivedMessage.content);
  });

  client.initialize();

  //app.listen(env.port, () => console.log('Server running at http://localhost:3000'))
}).catch(console.error)