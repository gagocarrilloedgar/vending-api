import request from 'supertest'
import server from 'src/app'

const app = request.agent(server)

export default app
