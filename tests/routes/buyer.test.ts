import request from 'supertest'

import { connect, close } from '../config/database.setup'
import app from '../../src/app'
import { newSeller, newUser } from '../config/fixtures/buyer'

let sellerToken: string
let buyerToken: string
let newProduct: any

const login = (user: typeof newUser) =>
  request(app)
    .post('/auth/login')
    .send({ email: user.email, password: user.password })
    .then((res) => res.body.data)

beforeAll(async () => {
  await connect()

  await request(app).post('/user').send(newUser)

  await request(app).post('/user').send(newSeller)

  const seller = await login(newSeller)
  const buyer = await login(newUser)

  sellerToken = seller.token
  buyerToken = buyer.token

  newProduct = await request(app)
    .post('/product')
    .send({
      name: 'pringles-onion',
      cost: 50,
      amountAvailable: 50
    })
    .set('Authorization', `Bearer ${sellerToken}`)

  await request(app)
    .patch('/user/deposit')
    .send({ amount: 500 })
    .set('Authorization', `Bearer ${buyerToken}`)
})

afterAll(async () => {
  await close()
})

describe('/buyer [PATCH]', () => {
  test('', async () => {
    const product = await request(app)
      .patch(`/buyer/buy/${newProduct.body._id}`)
      .send({ amount: 1 })
      .set('Authorization', `Bearer ${buyerToken}`)
      .expect('Content-Type', /json/)
      .expect(200)

    expect(product.body.product.info.amountAvailable).toBe(49)
  })

  test('Product id not defined should return 404', async () => {
    await request(app)
      .patch('/buyer/buy')
      .send({ amount: 1 })
      .set('Authorization', `Bearer ${buyerToken}`)
      .expect(404)
  })

  test('Amount not avialable should return Bad request with error message', async () => {
    const product = await request(app)
      .patch(`/buyer/buy/${newProduct.body._id}`)
      .send({ amount: 55 })
      .set('Authorization', `Bearer ${buyerToken}`)
      .expect(400)

    expect(product.body.message).toBe('Not enough amount')
  })

  test('Cost over user desposit should return - Not enough money', async () => {
    const product = await request(app)
      .patch(`/buyer/buy/${newProduct.body._id}`)
      .send({ amount: 40 })
      .set('Authorization', `Bearer ${buyerToken}`)
      .expect(400)

    expect(product.body.message).toBe('Not enough money')
  })
})
