import { User } from 'src/models/user.model'
import ApiError from 'src/utils/ApiError'
import express, { Request, Response } from 'express'
import httpStatus from 'http-status'
import { catchAsync } from 'src/utils/catchAsync'

const router = express.Router()

/**
 * @api {post} v1/auth/login Login
 * @apiName login
 * @apiGroup Auth
 * @apiPermission public
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
router.post(
  '/login',
  catchAsync(async (req: Request, res: Response) => {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (!user || !user.validPassword(password))
      throw new ApiError(
        httpStatus.UNPROCESSABLE_ENTITY,
        'Invalid email or password'
      )

    res.json(user.toAuthJSON())
  })
)

/**
 * @api {post} v1/auth/register Register
 * @apiName register
 * @apiGroup Auth
 * @apiVersion  1.0.0
 * @apiPermission public
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
 * @apiError (Error 400) BadRequest Invalid email or password
 * @apiError (Error 500) InternalServerError Internal server error
 * @apiHeaderExample {json} Header-Example:
 * {
 * "Content-Type": "application/json"
 * }
 */
router.post(
  '/register',
  catchAsync(async (req: Request, res: Response) => {
    const { username, email, password } = req.body
    const user = new User()
    user.username = username
    user.email = email
    user.setPassword(password)
    await user.save()
    res.json(user.toAuthJSON())
  })
)

export default router
