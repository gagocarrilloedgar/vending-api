/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import ApiError from 'src/utils/ApiError'
import mongoose from 'mongoose'
import httpStatus from 'http-status'
import { IS_PRODUCTION, IS_TEST } from 'src/config/config'
import logger from 'src/config/logger'

/**
 * Error converter
 * @param {Error} err
 * @param {Request} _req
 * @param {Response} _res
 * @param {NextFunction} next
 * @returns {Promise<void>}
 * @private
 * @function errorConverter
 * @memberof middlewares
 * @example
 */
export const errorConverter = (
  err: any,
  _req: any,
  _res: any,
  next: any
): void => {
  let error = err
  if (!(error instanceof ApiError)) {
    const statusCode =
      error.statusCode || error instanceof mongoose.Error.ValidationError
        ? httpStatus.BAD_REQUEST
        : httpStatus.INTERNAL_SERVER_ERROR
    const message = error.message || httpStatus[statusCode]
    error = new ApiError(statusCode, message as string, true, err.stack)
  }
  next(error)
}

export const errorHandler = (err: any, _req: any, res: any) => {
  let { statusCode, message } = err
  if (IS_PRODUCTION && !err.isOperational) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR
    message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR]
  }

  res.locals.errorMessage = err.message

  const response = {
    code: statusCode,
    message,
    ...(!IS_PRODUCTION && { stack: err.stack })
  }

  if (!IS_PRODUCTION && !IS_TEST) {
    logger.error(err)
  }

  res.status(statusCode).send({ error: response })
}
