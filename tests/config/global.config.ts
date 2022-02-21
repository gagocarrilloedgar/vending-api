import { connect, close, clear } from './database.setup'

beforeAll = async () => {
  await connect()
}

beforeEach = async () => {
  await close()
}

afterAll = async () => {
  await clear()
  await close()
}
