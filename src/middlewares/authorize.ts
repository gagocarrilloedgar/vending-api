/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import passport from 'passport'
import { UserRole } from 'src/models/user.model'
import { jwtStrategy } from 'src/config/passport'

passport.use(jwtStrategy)

const authenticate = (roles: UserRole[]) =>
  passport.authenticate('jwt', { session: false }, (req, res, next) => {
    if (!req.user) return res.status(401).send({ message: 'Unauthorized' })

    const role = req.user.role

    if (role && roles.find((userRole) => role === userRole)) return next()

    res.status(401).send({
      message: 'You are not authorized to access this resource'
    })
  })

export default authenticate
