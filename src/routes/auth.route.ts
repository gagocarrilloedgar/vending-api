import { User } from '@/models/user.model'
import ApiError from '@/utils/ApiError'
import express from 'express'
import httpStatus from 'http-status'

const router = express.Router()

/**
 * @api {post} v1/auth/login Login
 * @apiName login
 * @apiGroup Auth
 * @apiVersion  1.0.0
 * @apiDescription Login user and return JWT token
 * @apiParam  {String} email User's email
 * @apiParam  {String} password User's password
 * @apiSuccess (Success 201) {String} user User's Auth data
 * @apiError (Error 401) Unauthorized Invalid email or password
 * @apiError (Error 500) InternalServerError Internal server error
 * @apiHeaderExample {json} Header-Example:
 * {
 * "Content-Type": "application/json"
 * }
 * @apiParamExample {json} Request-Example:
 * {
 * "email": ""
 * "password": ""
 * }
 */
router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user || !user.validPassword(password))
      throw new ApiError(
        httpStatus.UNPROCESSABLE_ENTITY,
        'Invalid email or password'
      )
    res.json(user.toAuthJSON())
  } catch (e) {
    next(e)
  }
})

/**
 * @api {post} v1/auth/register Register
 * @apiName register
 * @apiGroup Auth
 * @apiVersion  1.0.0
 * @apiDescription Register user and return JWT token
 * @apiParam  {String} email User's email
 * @apiParam  {String} password User's password
 * @apiParam  {String} username User's username
 * @apiExample {json} Request example:
 * {
 * "email": "test@gmail.com"
 * "password": "123456",
 * "username": "jhon"
 * }
 * @apiSuccess (Success 201) {String} user User's Auth data
 * @apiSuccessExample {json} Success response:
 * {
 * "username": ""
 * "email": ""
 * "role": ""
 * }
 */
router.post('/register', async (req, res, next) => {
  try {
    const { username, email, password } = req.body
    const user = new User()
    user.username = username
    user.email = email
    user.setPassword(password)
    await user.save()
    res.json(user.toAuthJSON())
  } catch (e) {
    if (e.name === 'MongoError')
      return res.status(httpStatus.BAD_REQUEST).send(e)
    next(e)
  }
})

export default router
