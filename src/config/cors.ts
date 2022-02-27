import { IS_PRODUCTION } from './config'

const productionOrigins = ['https://www.example.com']
const testOrigins = ['http://localhost:3000', 'http://localhost:3001']

const allowedOrigins = IS_PRODUCTION ? productionOrigins : testOrigins

const corsOptionsDelegate = function (req: any, callback: any) {
  let corsOptions
  if (allowedOrigins.indexOf(req.header('Origin')) !== -1) {
    corsOptions = {
      origin: true,
      credentials: true,
      optionsSuccessStatus: 200,
      exposeHeaders: ['token']
    }
  } else {
    corsOptions = { origin: false } // disable CORS for this request
  }
  callback(null, corsOptions) // callback expects two parameters: error and options
}

export default corsOptionsDelegate
