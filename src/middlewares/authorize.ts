/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { NextFunction, Response } from 'express'
import { UserRole } from 'src/models/user.model'

const authorize =
  (roles: UserRole[]) => (req: any, res: Response, next: NextFunction) => {
    const role = req.user.role
    if (role && roles.find((userRole) => role === userRole)) return next()

    res.status(401).send({
      message: 'You are not authorized to access this resource'
    })
  }

export default authorize
