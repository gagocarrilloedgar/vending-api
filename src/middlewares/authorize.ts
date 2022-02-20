/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { UserRole } from '@/models/user.model'
import { NextFunction, Request, Response } from 'express'

const authorize =
  (roles: UserRole[]) => (req: Request, res: Response, next: NextFunction) => {
    const role = req.body.authRole

    if (role && roles.find((userRole) => role === userRole)) return next()

    res.status(401).send({
      message: 'You are not authorized to access this resource'
    })
  }

export default authorize
