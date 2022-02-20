import authorize from '@/middlewares/authorize'
import { User, UserRole } from '@models/user.model'
import express from 'express'
import httpStatus from 'http-status'
import { authenticate } from 'passport'

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
router.post('/:id', authorize([UserRole.ADMIN]), async (req, res, next) => {
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

/**
 * @api {get} v1/user/:id get user by id
 * @apiName get user by id
 * @apiGroup User
 * @apiPermission admin, seller, buyer
 * @apiVersion  1.0.0
 * @apiDescription Get user by id
 * @apiSuccess (Success 200) {String} user User's Auth data
 * @apiSuccessExample {json} Success response:
 * {
 * "username": ""
 * "email": ""
 * "role": ""
 * }
 * @apiError (Error 400) BadRequest Invalid Id
 * @apiError (Error 500) InternalServerError Internal server error
 * @apiHeaderExample {json} Header-Example:
 *  {
 *      "Content-Type": "application/json"
 *  }
 */
router.get(
  '/user',
  authenticate(['jwt']),
  authorize([UserRole.ADMIN, UserRole.BUYER, UserRole.SELLER]),
  async (req, res, next) => {
    try {
      const user = await User.findById(req.params.id)
      res.json(user.toAuthJSON())
    } catch (e) {
      next(e)
    }
  }
)

/**
 * @api {get} v1/user/:id get user by id
 * @apiName get user by id
 * @apiGroup User
 * @apiPermission admin, seller, buyer
 * @apiVersion  1.0.0
 * @apiDescription Get user by id
 * @apiSuccess (Success 200) {String} success message
 * @apiSuccessExample {json} Success response:
 * {
 * "success": "User updted successfully"
 * }
 * @apiError (Error 400) BadRequest Invalid Id
 * @apiError (Error 500) InternalServerError Internal server error
 */
router.patch(
  '/:id',
  authenticate(['jwt']),
  authorize([UserRole.ADMIN, UserRole.BUYER, UserRole.SELLER]),
  async (req, res, next) => {
    try {
      await User.findByIdAndUpdate(req.params.id, req.body)
      res.status(httpStatus.OK).json({ message: 'User updated successfully' })
    } catch (e) {
      next(e)
    }
  }
)

/**
 * @api {delete} v1/user/:id delete user by id
 * @apiName delete user by id
 * @apiGroup User
 * @apiPermission admin, buyer, seller
 * @apiVersion  1.0.0
 * @apiDescription Delete user by id
 * @apiSuccess (Success 200) {String} Success message
 * @apiSuccessExample {json} Success response:
 *     {
 *      "message": "User deleted"
 *     }
 * @apiError (Error 400) BadRequest Invalid Id
 * @apiError (Error 500) InternalServerError Internal server error
 * @apiHeaderExample {json} Header-Example:
 *    {
 *      "Content-Type": "application/json"
 *    }
 */
router.delete(
  '/:id',
  authenticate(['jwt']),
  authorize([UserRole.ADMIN, UserRole.BUYER, UserRole.SELLER]),
  async (req, res, next) => {
    try {
      await User.findByIdAndDelete(req.params.id)
      res.status(httpStatus.OK).json({ message: 'User deleted' })
    } catch (e) {
      next(e)
    }
  }
)
