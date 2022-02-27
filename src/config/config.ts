import 'dotenv/config'
export const ENVIRONMENT = process.env.NODE_ENV || 'dev'
export const IS_PRODUCTION = ENVIRONMENT === 'production'
export const IS_TEST = ENVIRONMENT === 'test'
export const PORT = Number(process.env.PORT) || 3000
export const APP_PREFIX_PATH = process.env.APP_PREFIX_PATH || '/'
export const JWT_SECRET = process.env.JWT_SECRET || 'some-random-secret'
export const JWT_EXPIRE = process.env.JWT_EXPIRE || '1y'
export const DB_URI = process.env.DB_URI
export const SESSION_SECRET = process.env.SESSION_SECRET
export const MONGO_SECRET = process.env.MONGO_SECRET
