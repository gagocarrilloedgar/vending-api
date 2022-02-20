import authorize from '@/middlewares/authorize'
import { User, UserRole } from '@models/user.model'
import express from 'express'
import httpStatus from 'http-status'

const router = express.Router()

/**
 * @api {post} v1/user add user
 * @apiName add user
 * @apiGroup User
 * @apiPermission admin
 * @apiVersion  1.0.0
 * @apiDescription Create a user using ADMIN role
 * @apiParam  {String} email User's email
 * @apiParam  {String} password User's password
 * @apiParam  {String} username User's username
 * @apiExample {json} Request example:
 * {
 * "email": "somemail@mail.com"
 * "password": "123456",
 * "username": "jhon"
 * "role": "admin"
 * }
 * @apiSuccess (Success 200) {String} user User's Auth data
 * @apiSuccessExample {json} Success response:
 */
router.post('/user', authorize([UserRole.ADMIN]), async (req, res, next) => {
  try {
    const { email, password, username, role } = req.body
    const user = new User()
    user.email = email
    user.username = username
    user.role = role
    user.setPassword(password)
    await user.save()
    res.json(user.toAuthJSON())
  } catch (e) {
    if (e.name === 'MongoError')
      return res.status(httpStatus.BAD_REQUEST).send(e)
    next(e)
  }
})
