import express, { Request, Response } from 'express'
import httpStatus from 'http-status'

import authorize from 'src/middlewares/authorize'
import { UserRole } from 'src/models/user.model'
import { Product } from 'src/models/product.model'
import { catchAsync } from 'src/utils/catchAsync'

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
router.get(
  '/:id',
  catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id
    const product = await Product.findById(id)
    res.status(httpStatus.OK).send(product)
  })
)

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
  authorize([UserRole.ADMIN, UserRole.SELLER]),
  catchAsync(async (req: Request, res: Response) => {
    const product = await Product.create(req.body)
    res.status(httpStatus.CREATED).send(product)
  })
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
  authorize([UserRole.ADMIN, UserRole.SELLER]),
  catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id
    await Product.findByIdAndDelete(id)
    res.status(httpStatus.OK).send({ message: 'Product successfully deleted' })
  })
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
  authorize([UserRole.ADMIN, UserRole.SELLER]),
  catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id
    const body = req.body

    const product = await Product.findByIdAndUpdate(id, body)

    res.status(httpStatus.OK).send(product)
  })
)

export default router
