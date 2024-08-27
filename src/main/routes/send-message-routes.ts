import { Router } from "express"
import { adaptRoute } from "../adapters/express-route-adapter"
import { makeSendMessageController } from "../factories/send-message"

export default (router: Router): void => {
  router.post('/message/', adaptRoute(makeSendMessageController()))
}