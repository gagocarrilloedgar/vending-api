/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import httpStatus from 'http-status'
import { NextFunction, Request, Response } from 'express'
import { Product } from '@/models/product.model'

export const checkSellerId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id
  const sellerId = req.query.sellerId

  const product = await Product.findById(id)

  if (!sellerId || !id)
    return res
      .status(httpStatus.BAD_REQUEST)
      .send({ message: 'sellerId and id are required' })

  if (product.sellerId !== sellerId)
    return res
      .status(httpStatus.BAD_REQUEST)
      .send({ message: 'You are not authorized to delete this product' })

  next()
}
