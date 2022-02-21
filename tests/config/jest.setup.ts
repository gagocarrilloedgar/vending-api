import request from 'supertest'
import server from 'src/app'

const agent = request.agent(server)

export default agent
