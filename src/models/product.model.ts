import { Schema, Document, model } from 'mongoose'

export interface IProduct {
  name: string
  sellerId: string
  cost: number
  amountAvailable: number
}

export default interface IProductModel extends Document, IProduct {}

const schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3
    },
    sellerId: {
      type: String,
      required: true
    },
    cost: {
      type: Number,
      required: true
    },
    amountAvailable: {
      type: Number,
      required: true
    }
  },
  {
    timestamps: true
  }
)

export const Product = model<IProductModel>('Product', schema)
