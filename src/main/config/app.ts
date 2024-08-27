import express, { Express } from 'express'
import setupMiddlewares from './middlewares'
import setupRoutes from './routes'

export const makeApp = (): Express => {
  const app = express()
  setupMiddlewares(app)
  setupRoutes(app)
  return app
}