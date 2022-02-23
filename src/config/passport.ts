import { JWT_SECRET } from 'src/config/config'
import { User } from 'src/models/user.model'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'

interface JWTPayload {
  id: string
  username: string
  email: string
  iat: number
  exp: number
}

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET,
  passReqToCallback: false
}

export const jwtStrategy = new JwtStrategy(
  options,
  async (payload: JWTPayload, done) => {
    try {
      const user = await User.findById(payload.id)
      if (!user) return done(null, false)
      done(null, user.toJSON())
    } catch (e) {
      return done(e)
    }
  }
)
