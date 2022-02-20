import 'dotenv-safe'
export const ENVIRONMENT = process.env.APP_ENV || 'dev'
export const IS_PRODUCTION = ENVIRONMENT === 'production'
export const IS_TEST = ENVIRONMENT === 'test'
export const APP_PORT = Number(process.env.APP_PORT) || 3000
export const APP_PREFIX_PATH = process.env.APP_PREFIX_PATH || '/'
export const JWT_SECRET = process.env.JWT_SECRET || 'some-random-secret'
export const JWT_EXPIRE = process.env.JWT_EXPIRE || '1y'
export const DB_URI = process.env.DB_URI
