import app from './app'
import { PORT } from 'src/config/config'
import 'src/config/mongoose'
import logger from 'src/config/logger'

app.listen(PORT, () => {
  logger.info(`server listening on ${PORT}`)
})
