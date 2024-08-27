import { Express, Router } from 'express'
import fg from 'fast-glob'
import path from 'path'

export default async (app: Express): Promise<void> => {
  const router = Router()
  app.use(router)

  const routeFiles = await fg('src/main/routes/**/*-routes.{ts,js}', { absolute: true })

  for (const file of routeFiles) {
    try {
      const relativeFilePath = path.relative(__dirname, file).replace(/\.js$/, '').replace(/\.ts$/, '')
      const routeModule = await import(relativeFilePath)
      routeModule.default(router)
    } catch (error) {
      console.error(`Failed to load route file ${file}:`, error)
    }
  }
}