import authorize from '@/middlewares/authorize'
import { UserRole } from '@models/user.model'
import { Product } from '@models/product.model'
import express from 'express'
import httpStatus from 'http-status'
import { authenticate } from 'passport'
import { checkSellerId } from '@/middlewares/checkSellerId'

const router = express.Router()

/**
 * @api {post} v1/product/:id get product
 * @apiName getProductById
 * @apiGroup Product
 * @apiPermission seller, admin, buyer
 * @apiVersion  1.0.0
 * @apiDescription Get product by id
 * @apiParam  {String} id Product's id
 * @apiExample {json} Request example:
 * {
 * "id": "5e9f8f8f8f8f8f8f8f8f8f8"
 * }
 * @apiSuccess (Success 200) {String} product Product's data
 */
router.get('/:id', authenticate(['jwt']), async (req, res, next) => {
  try {
    const { id } = req.params
    if (!id)
      res.status(httpStatus.BAD_REQUEST).send({ message: 'id is required' })

    const product = await Product.findById(id)
    res.status(httpStatus.OK).send(product)
  } catch (e) {
    next(e)
  }
})

/**
 * @api {patch} v1/product/:id add product
 * @apiName update addProduct
 * @apiGroup Product
 * @apiPermission admin, seller
 * @apiVersion  1.0.0
 * @apiDescription Add new product
 * @apiSuccess (Success 200) {String} success message
 * @apiSuccessExample {json} Success response:
 * {
 * "name": "",
 * "sellerdId": "",
 * "cost": "",
 * "amountAvailable": "",
 * }
 *
 *
 */
router.post(
  '/',
  authenticate(['jwt']),
  authorize([UserRole.ADMIN, UserRole.SELLER]),
  async (req, res, next) => {
    try {
      const product = await Product.create(req.body)
      res.status(httpStatus.CREATED).send(product)
    } catch (e) {
      next(e)
    }
  }
)

/**
 * @api {patch} v1/product/:id delete product
 * @apiName delete product
 * @apiGroup Product
 * @apiPermission admin, seller
 * @apiVersion  1.0.0
 * @apiDescription Delete product by id
 * @apiSuccess (Success 200) {String} success message
 * @apiSuccessExample {json} Success response:
 * {
 * "success": "Product deleted successfully"
 * }
 *
 */
router.delete(
  '/:id',
  authenticate(['jwt']),
  authorize([UserRole.ADMIN, UserRole.SELLER]),
  checkSellerId,
  async (req, res, next) => {
    const id = req.params.id
    try {
      await Product.findByIdAndDelete(id)
      res
        .status(httpStatus.OK)
        .send({ message: 'Product successfully deleted' })
    } catch (e) {
      next(e)
    }
  }
)

/**
 * @api {put} v1/product/:id update product
 * @apiName update product
 * @apiGroup Product
 * @apiPermission admin, seller
 * @apiVersion  1.0.0
 * @apiDescription Update product usint the product id and the seller id
 * @apiSuccess (Success 200) {String} success message
 * @apiSuccessExample {json} Success response:
 * {
 * "success": "Product updated successfully"
 * }
 * @apiError (Error 400) BadRequest Invalid Id
 * @apiError (Error 500) InternalServerError Internal server error
 * @apiError (Error 401) Unauthorized You are not authorized to update this product
 * @apiError (Error 404) NotFound Product not found
 */
router.patch(
  '/:id',
  authenticate(['jwt']),
  authorize([UserRole.ADMIN, UserRole.SELLER]),
  checkSellerId,
  async (req, res, next) => {
    const id = req.params.id
    const body = req.body
    try {
      const product = await Product.findByIdAndUpdate(id, body)
      res.status(httpStatus.OK).send(product)
    } catch (e) {
      next(e)
    }
  }
)
