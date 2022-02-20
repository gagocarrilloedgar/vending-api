/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { NextFunction, Request, Response } from 'express'

const authorize =
  (roles: [string]) => (req: Request, res: Response, next: NextFunction) => {
    if (req.user && roles.some((role) => roles.includes(role))) {
      next()
    } else {
      res.status(401).send({
        message: 'You are not authorized to access this resource'
      })
    }
  }

export default authorize
