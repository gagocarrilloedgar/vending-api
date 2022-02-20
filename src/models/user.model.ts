import { Schema, Document, model } from 'mongoose'
import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import { JWT_EXPIRE, JWT_SECRET } from '@/config/config'
import uniqueValidator from 'mongoose-unique-validator'
import privateValidator from 'mongoose-private'

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
      default: 0
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

// Plugins
schema.plugin(uniqueValidator)
schema.plugin(privateValidator)

schema.virtual('name').get(function (this: IUserModel) {
  return this.username
})

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
  const { username, email, role } = this
  return {
    username,
    email,
    role,
    token: this.generateJWT()
  }
}

export const User = model<IUserModel>('User', schema)
