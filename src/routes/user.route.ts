import { Router, Request, Response } from 'express'
import httpStatus from 'http-status'

import { catchAsync } from 'src/utils/catchAsync'
import authorize from 'src/middlewares/authorize'
import { User, UserRole } from 'src/models/user.model'
import passport from 'passport'
import { checkValidCoins } from 'src/utils/checkValidCoins'
import { ValidAmounts } from 'src/models/types'

const router = Router()

/**
 * @api {get} v1/desposit
 * @apiName updateDeposit
 * @apiGroup User
 * @apiPermission admin, seller
 * @apiVersion  1.0.0
 * @apiDescription Update user deposit
 * @apiParam  {String} id User's id
 * @apiParam  {String} amount User's deposit
 * @apiSuccess (Success 200) {String} success message
 * @apiSuccessExample {json} Success response:
 * {
 * "success": "User deposit updated successfully"
 * }
 */
router.patch(
  '/deposit',
  passport.authenticate('jwt'),
  authorize([UserRole.SELLER, UserRole.ADMIN, UserRole.BUYER]),
  catchAsync(async (req: any, res: Response) => {
    const { amount } = req.body
    const id = req.user.id
    const deposit = amount + req.user.deposit

    if (!amount)
      return res
        .status(httpStatus.BAD_REQUEST)
        .send('Invalid request, missing amount')

    await User.findOneAndUpdate(
      { _id: id },
      { $set: { deposit } },
      { runValidators: true }
    )

    res
      .status(httpStatus.OK)
      .json({ message: 'User deposit updated successfully' })
  })
)

/**
 * @api {get} v1/user/reset/:id
 * @apiName resetUserDeposit
 * @apiGroup User
 * @apiPermission buyer
 * @apiVersion  1.0.0
 * @apiDescription Reset user deposit to 0
 * @apiParam  {String} id User's id
 * @apiSuccess (Success 200) {String} success message
 * @apiSuccessExample {json} Success response:
 * {
 * "success": "User deposit reset successfully"
 * }
 */

router.patch(
  '/reset',
  passport.authenticate('jwt'),
  authorize([UserRole.SELLER, UserRole.ADMIN, UserRole.BUYER]),
  catchAsync(async (req: any, res: Response) => {
    await User.updateOne({ _id: req.user.id }, { $set: { deposit: 0 } })

    res
      .status(httpStatus.OK)
      .json({ message: 'User deposit reset successfully' })
  })
)

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
 * @apiSuccess (Success 200) {String} success Success message
 * @apiSuccessExample {json} Success response:
 * {
 * "success": "User successfully created"
 * }
 * @apiError (Error 401) Unauthorized Invalid email or password
 * @apiError (Error 500) InternalServerError Internal server error
 * @apiHeaderExample {json} Header-Example:
 * {
 * "Content-Type": "application/json"
 * }
 */
router.post(
  '/',
  catchAsync(async (req: Request, res: Response) => {
    const { email, password, username, role } = req.body
    const user = new User()
    user.email = email
    user.username = username
    user.role = role
    user.setPassword(password)
    await user.save()
    res.status(httpStatus.CREATED).json({
      message: 'User successfully created',
      userId: user._id
    })
  })
)

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
  '/:id',
  passport.authenticate('jwt'),
  authorize([UserRole.SELLER, UserRole.ADMIN, UserRole.BUYER]),
  catchAsync(async (req: Request, res: Response) => {
    const user = await User.findById(req.params.id)
    res.json(user.toAuthJSON())
  })
)

/**
 * @api {get} v1/user/:id update user by id
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
  passport.authenticate('jwt'),
  authorize([UserRole.SELLER, UserRole.ADMIN, UserRole.BUYER]),
  catchAsync(async (req: any, res: Response) => {
    const deposit = checkValidCoins(
      ValidAmounts,
      req.body.deposit + req.user.deposit
    )

    if (!deposit)
      return res.status(httpStatus.BAD_REQUEST).send('Invalid deposit amount')

    await User.findByIdAndUpdate(req.params.id, { deposit })
    res.status(httpStatus.OK).json({ message: 'User updated successfully' })
  })
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
  passport.authenticate('jwt'),
  authorize([UserRole.SELLER, UserRole.ADMIN, UserRole.BUYER]),
  catchAsync(async (req: Request, res: Response) => {
    await User.findByIdAndDelete(req.params.id)
    res.status(httpStatus.OK).json({ message: 'User deleted' })
  })
)

export default router
