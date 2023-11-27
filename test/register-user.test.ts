import request from 'supertest'
import server from '../src/server'
import prisma from '../src/external/database/db'

describe('Register user route', () => {
    beforeEach(async () => {
        await prisma.user.deleteMany({})
    })

    afterAll(async () => {
        await prisma.user.deleteMany({})
    })

    it('registers a user with valid data', async () => {
        await request(server)
            .post('/api/users')
            .send({
                name: 'Joe Doe',
                email: 'joe@mail.com',
                password: '1validPassword;'
            })
            .expect(201)
            .then((res) => {
                expect(res.body.id).toBeDefined()
            })
    })

    it.only('returns 400 when trying to register duplicate user', async () => {
        await request(server)
            .post('/api/users')
            .send({
                name: 'Joe Doe',
                email: 'joe@mail.com',
                password: '1validPassword;'
            })
            .expect(201)

        await request(server)
            .post('/api/users')
            .send({
                name: 'Joe Doe',
                email: 'joe@mail.com',
                password: '1validPassword;'
            })
            .expect(400)
    }, 20000)
})