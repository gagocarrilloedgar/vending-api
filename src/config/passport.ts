import { JWT_SECRET } from 'src/config/config'
import { User } from 'src/models/user.model'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import passport from 'passport'

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
  passReqToCallback: true
}

passport.use(
  new JwtStrategy(
    options,
    async (_req: any, payload: JWTPayload, done: any) => {
      try {
        const user = await User.findById(payload.id)
        if (!user) return done(null, false)
        done(null, user)
      } catch (e) {
        return done(e)
      }
    }
  )
)

passport.serializeUser((user: any, done) => {
  done(null, user.id)
})

passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await User.findById(id)
    if (!user) return done(null, false)
    done(null, user)
  } catch (e) {
    return done(e)
  }
})

export default passport
