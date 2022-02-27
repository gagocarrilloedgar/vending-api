import express from 'express'

import auth from './routes/auth.route'
import user from './routes/user.route'
import product from './routes/product.route'
import buyer from './routes/buyer.route'

const router = express.Router()

router.use('/user', user)
router.use('/product', product)
router.use('/buyer', buyer)
router.use('/auth', auth)

export default router
