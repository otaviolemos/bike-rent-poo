import request from 'supertest'
import server from '../src/server'
import prisma from '../src/external/database/db'

describe('Register bike route', () => {
    beforeEach(async () => {
        await prisma.bike.deleteMany({})
    })

    afterAll(async () => {
        await prisma.bike.deleteMany({})
        server.close()
    })

    it('registers a bike with valid data', async () => {
        await request(server)
            .post('/api/bikes')
            .send({
                name: 'My bike',
                type: 'Mountain Bike',
                bodySize: 25,
                maxLoad: 200,
                rate: 20.0,
                description: 'My beautiful bike',
                ratings: 5,
                imageUrls: [
                    'https://mybike.com/img1.png'
                ]
            })
            .expect(201)
            .then((res) => {
                expect(res.body.id).toBeDefined()
            })
    })
})