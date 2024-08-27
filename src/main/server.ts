import { makeApp } from "./config/app";
import env from "./config/env";

const app = makeApp();
app.listen(env.port, () => console.log('Server running at http://localhost:3000'))