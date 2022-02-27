/* eslint-disable no-unused-vars */
import { Schema, Document, model } from 'mongoose'
import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import { JWT_EXPIRE, JWT_SECRET } from 'src/config/config'
import { checkValidCoins } from 'src/utils/checkValidCoins'
import { ValidAmounts } from './types'

export interface IUser {
  username: string
  email: string
  password: string
  deposit: number
  role: string
  salt: string
}
export interface IUserToAuthJSON {
  username: string
  email: string
  role: string
}

export enum UserRole {
  ADMIN = 'admin',
  BUYER = 'buyer',
  SELLER = 'seller'
}

export default interface IUserModel extends Document, IUser {
  setPassword(password: string): void
  validPassword(password: string): boolean
  toAuthJSON(): IUserToAuthJSON
  generateJWT(): string
  generateAccessJWT(): string
  name: string
}

const schema = new Schema<IUserModel>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      minlength: 6,
      maxlength: 20
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      private: true
    },
    salt: {
      type: String,
      private: true
    },
    deposit: {
      type: Number,
      default: 0,
      validator: [
        (value: number) => checkValidCoins(ValidAmounts, value),
        'Invalid deposit amount'
      ]
    },
    role: {
      type: String,
      enum: UserRole,
      default: 'buyer'
    }
  },
  {
    timestamps: true
  }
)

schema.virtual('name').get(function (this: IUserModel) {
  return this.username
})

schema.path('deposit').validate(function (this: IUserModel, value: number) {
  return value === 0 ? true : checkValidCoins(ValidAmounts, value)
}, 'Invalid deposit amount')

schema.methods.setPassword = function (newPassword: string) {
  this.salt = crypto.randomBytes(16).toString('hex')
  this.password = crypto
    .pbkdf2Sync(newPassword, this.salt, 10000, 512, 'sha512')
    .toString('hex')
}

schema.methods.validPassword = function (newPassword: string): boolean {
  const hash = crypto
    .pbkdf2Sync(newPassword, this.salt, 10000, 512, 'sha512')
    .toString('hex')
  return this.password === hash
}

schema.methods.generateJWT = function (): string {
  return jwt.sign(
    {
      id: this._id,
      name: this.name,
      email: this.email
    },
    JWT_SECRET,
    {
      expiresIn: JWT_EXPIRE
    }
  )
}

schema.methods.toAuthJSON = function () {
  const { _id, username, email, role } = this
  return {
    id: _id,
    username,
    email,
    role,
    token: this.generateJWT()
  }
}

export const User = model<IUserModel>('User', schema)
