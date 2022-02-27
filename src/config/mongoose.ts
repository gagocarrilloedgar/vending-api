import mongoose from 'mongoose'
import { DB_URI } from './config'
import logger from './logger'

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  autoIndex: true
}

logger.debug(DB_URI)
logger.info('connecting to database...')

mongoose
  .connect(DB_URI, options)
  .then(() => {
    logger.info('Mongoose connection done')
  })
  .catch((e) => {
    logger.error('Mongoose connection error')
    logger.error(e)
  })

// When successfully connecteds
mongoose.connection.on('connected', () => {
  logger.debug('Mongoose default connection open to ' + DB_URI)
})

// If the connection throws an error
mongoose.connection.on('error', (err) => {
  logger.error('Mongoose default connection error: ' + err)
})

// When the connection is disconnected
mongoose.connection.on('disconnected', () => {
  logger.info('Mongoose default connection disconnected')
})

// If the Node process ends, close the Mongoose connection (ctrl + c)
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    logger.info(
      'Mongoose default connection disconnected through app termination'
    )
    process.exit(0)
  })
})

process.on('uncaughtException', (err) => {
  logger.error('Uncaught Exception: ' + err)
})

export default mongoose
  .connect(DB_URI, options)
  .then((c) => c.connection.getClient())
