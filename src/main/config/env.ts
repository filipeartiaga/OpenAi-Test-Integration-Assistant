require('dotenv').config({ path: require('find-config')('.env') })

export default {
  port: process.env.PORT || 3000,
  authorizationKey: process.env.AUTHORIZATION_KEY || '',
  OpenAIOrganization: process.env.OPENAI_ORGANIZATION || '',
  OpenAIBetaVersion: process.env.OPENAI_BETA_VERSION || '',
  assistantId: process.env.ASSISTANT_ID || '',
  mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/chatbot'
}