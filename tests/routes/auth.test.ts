import { connect, close } from '../config/database.setup'
import request from 'supertest'
import app from '../../src/app'
import { newUser } from '../config/fixtures/buyer'

beforeAll(async () => {
  await connect()
  await request(app).post('/user').send(newUser)
})

afterAll(async () => {
  await close()
})

describe('AUTH rotues', () => {
  test('', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send({ email: newUser.email, password: newUser.password })
      .expect('Content-Type', /json/)
      .expect(200)

    const { token } = response.body.data
    expect(token).toBeDefined()
  })
})
