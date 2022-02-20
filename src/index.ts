import mongoose from 'mongoose'
import app from './app'
import { APP_PORT, DB_URI } from '@/config/config'
import logger from './config/logger'

const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  autoIndex: true,
  poolSize: 10, // Maintain up to 10 socket connections
  // If not connected, return errors immediately rather than waiting for reconnect
  bufferMaxEntries: 0,
  connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
  socketTimeoutMS: 45000 // Close sockets after 45 seconds of inactivity
}

logger.debug(DB_URI)
logger.info('connecting to database...')

mongoose
  .connect(DB_URI, options)
  .then(() => {
    logger.info('Mongoose connection done')
    app.listen(APP_PORT, () => {
      logger.info(`server listening on ${APP_PORT}`)
    })
  })
  .catch((e) => {
    logger.error('Mongoose connection error')
    logger.error(e)
  })

// When successfully connected
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
