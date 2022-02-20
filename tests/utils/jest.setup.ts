import request from 'supertest'
import server from '@/app'

const agent = request.agent(server)

export default agent
