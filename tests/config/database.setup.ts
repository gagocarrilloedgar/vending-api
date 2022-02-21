import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'

let mongoServer: MongoMemoryServer

export const connect = async () => {
  mongoServer = await MongoMemoryServer.create()
  const uri = mongoServer.getUri()

  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: true
  }

  await mongoose.connect(uri, options)
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
