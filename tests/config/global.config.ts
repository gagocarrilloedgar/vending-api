import { connect, close, clear } from './database.setup'

beforeAll = async () => {
  await connect()
}

beforeEach = async () => {
  await clear()
}

afterAll = async () => {
  await close()
}
