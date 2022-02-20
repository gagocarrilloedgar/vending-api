import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'

const mongoServer = new MongoMemoryServer()

export const connect = async () => {
  const mongoUri = mongoServer.getUri()

  const mongooseOpts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  }

  await mongoose.connect(mongoUri, mongooseOpts)
}

export const clear = async () => {
  await mongoose.connection.dropDatabase()
  await mongoose.connection.close()
  await mongoServer.stop()
}

export const close = async () => {
  await mongoose.connection.close()
  await mongoServer.stop()
}

export default {
  connect,
  clear,
  close
}

beforeAll(async () => connect())
beforeEach(async () => clear())
afterAll(async () => close())
