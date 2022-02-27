import express from 'express'
import helmet from 'helmet'
import mongoSanitize from 'express-mongo-sanitize'
import compression from 'compression'
import cors from 'cors'
import httpStatus from 'http-status'
import session from 'express-session'

import passport from 'src/config/passport'
import { IS_TEST, APP_PREFIX_PATH, SESSION_SECRET } from 'src/config/config'
import { morganSuccessHandler, morganErrorHandler } from 'src/config/morgan'
import ApiError from './utils/ApiError'
import routes from './routes'
import { errorConverter, errorHandler } from './middlewares/error'
import corsOptionsDelegate from 'src/config/cors'

const app = express()

// Documentation api
app.use(express.static('public'))

app.set('trust proxy', 1) // trust first proxy
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
  })
)

if (!IS_TEST) {
  app.use(morganSuccessHandler)
  app.use(morganErrorHandler)
}

// set security HTTP headers
app.use(helmet())

// parse json request body
app.use(express.json())

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }))

// sanitize request data
app.use(mongoSanitize())

// gzip compression
app.use(compression())

app.use(cors(corsOptionsDelegate))

app.use(passport.initialize())
app.use(passport.session())

app.use(APP_PREFIX_PATH, routes)

// send back a 404 error for any unknown api request
app.use((_req, _res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'))
})

// convert error to ApiError, if needed
app.use(errorConverter)

// handle error
app.use(errorHandler)

export default app
