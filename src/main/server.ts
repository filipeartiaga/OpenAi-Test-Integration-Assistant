import { MongoHelper } from "../infra/mongodb/mongo-helper";
import { makeApp } from "./config/app";
import env from "./config/env";

const app = makeApp();
app.listen(env.port, () => console.log('Server running at http://localhost:3000'))

MongoHelper.connect(env.mongoUrl).then(async () => {
  console.log('Connected to MongoDB');
}).catch(console.error)