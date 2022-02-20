/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import httpStatus from 'http-status'
import { NextFunction, Request, Response } from 'express'

type reqType = 'query' | 'params' | 'body'
type paramsType = {
  type: reqType
  key: string
}

const paramsCheck =
  (params: paramsType[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    params.forEach(({ type, key }) => {
      if (!req[type][key])
        return res
          .status(httpStatus.BAD_REQUEST)
          .send({ message: `${key} is required` })
    })

    next()
  }

export default paramsCheck
