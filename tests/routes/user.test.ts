import request from 'supertest'

import { connect, close } from '../config/database.setup'
import { newUser } from '../config/fixtures/buyer'
import app from '../../src/app'

beforeAll(async () => {
  await connect()
})

afterAll(async () => {
  await close()
})

const login = async () =>
  request(app)
    .post('/auth/login')
    .send({ email: newUser.email, password: newUser.password })
    .then((res) => res.body.data)

describe('/user [POST]', () => {
  test('Create user should return 201', async () => {
    await request(app)
      .post('/user')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /json/)
  })

  test('Create user with existing email should return 500', async () => {
    await request(app).post('/user').send(newUser).expect(500)
  })
})

describe('/user [GET]', () => {
  test('Get user should return 200', async () => {
    const { token, id } = await login()

    await request(app)
      .get(`/user/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /json/)
  })
})

describe('/user [PATCH]', () => {
  test('Update user should return 200', async () => {
    const { token, id } = await login()

    await request(app)
      .patch(`/user/${id}`)
      .send({ deposit: 500 })
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /json/)
  })

  test('/user/deposit update deposit should return 200', async () => {
    const { token } = await login()

    await request(app)
      .patch(`/user/deposit`)
      .send({ amount: 500 })
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /json/)
  })

  test('/user/deposit undefined deposit shoudl return bad request', async () => {
    const { token } = await login()

    await request(app)
      .patch(`/user/deposit`)
      .send()
      .set('Authorization', `Bearer ${token}`)
      .expect(400)
      .expect('Content-Type', /json/)
  })

  test('/user/reset deposit should return 200', async () => {
    const { token } = await login()

    await request(app)
      .patch(`/user/reset`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /json/)
  })
})

describe('/user [DELETE]', () => {
  test('Delete user should return 200', async () => {
    const { token, id } = await login()

    await request(app)
      .delete(`/user/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /json/)
  })
})
