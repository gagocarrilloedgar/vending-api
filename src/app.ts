import express from 'express'
import helmet from 'helmet'
import mongoSanitize from 'express-mongo-sanitize'
import compression from 'compression'
import cors from 'cors'
import routes from './routes'
import { morganSuccessHandler, morganErrorHandler } from 'src/config/morgan'
import { IS_TEST, APP_PREFIX_PATH } from 'src/config/config'
import httpStatus from 'http-status'
import ApiError from './utils/ApiError'
import { errorConverter, errorHandler } from './middlewares/error'
import passport from 'passport'
import session from 'express-session'

const app = express()

// Documentation api
app.use(express.static('public'))

app.set('trust proxy', 1) // trust first proxy
app.use(
  session({
    secret: 'secretsession',
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

app.use(cors())

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
