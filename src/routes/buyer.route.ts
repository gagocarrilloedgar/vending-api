import authorize from 'src/middlewares/authorize'
import { User, UserRole } from 'src/models/user.model'
import { ValidAmounts } from 'src/models/types'
import { Product } from 'src/models/product.model'
import express, { Request, Response } from 'express'
import httpStatus from 'http-status'
import { authenticate } from 'passport'
import { mapToCoinTypes } from 'src/utils/mapToCoinTypes'
import { catchAsync } from 'src/utils/catchAsync'

const router = express.Router()

/**
 * @api {post} v1/user/buy/:id buy a product
 * @apiName buyProduct
 * @apiGroup User
 * @apiPermission buyer
 * @apiVersion  1.0.0
 * @apiDescription Buy a product
 * @apiParam  {String} id Product's id
 * @apiParam  {String} amount Amount to buy
 * @apiSuccess (Success 200) {String} product object
 * @apiSuccessExample {json} Success response:
 * {
 * "total": 5,
 * "product": {
 *      info:
 *      {
 *         "id": "5e9f8f8f8f8f8f8f8f8f8f8",
 *         "name": "",
 *         "sellerId": "",
 *         "cost": "",
 *         "amountAvailable": "",
 *         "createdAt": "2020-05-06T15:41:32.000Z"
 *      }
 * amount: 5,
 * change:0,
 * }
 *
 *
 */
router.patch(
  '/buy/:id',
  authenticate(['jwt']),
  authorize([UserRole.BUYER]),
  catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id
    const { amount, buyerId } = req.body

    const product = await Product.findById(id)

    if (!product)
      return res
        .status(httpStatus.NOT_FOUND)
        .send({ message: 'Product not found' })

    const total = product.cost * amount

    if (product.amountAvailable < amount)
      return res.status(httpStatus.OK).send({ message: 'Not enough amount' })

    const user = await User.findById(buyerId)

    if (!user)
      return res
        .status(httpStatus.NOT_FOUND)
        .send({ message: 'User not found' })

    if (user.deposit < total)
      return res.status(httpStatus.OK).send({ message: 'Not enough money' })

    const change = user.deposit - total

    const changeInCoins = mapToCoinTypes(ValidAmounts, change)

    if (change !== 0 && !changeInCoins)
      return res
        .status(httpStatus.OK)
        .send({ message: 'The money provided did not have the rigth coins' })

    user.deposit -= total
    product.amountAvailable -= amount

    await user.save()
    await product.save()

    res.status(httpStatus.OK).json({
      total,
      product: {
        info: product,
        amount: amount
      },
      change: change === 0 ? change : changeInCoins
    })
  })
)

export default router
