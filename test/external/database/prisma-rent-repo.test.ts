import { Bike } from "../../../src/bike"
import { PrismaBikeRepo } from "../../../src/external/database/prisma-bike-repo"
import { PrismaRentRepo } from "../../../src/external/database/prisma-rent-repo"
import { PrismaUserRepo } from "../../../src/external/database/prisma-user-repo"
import { Rent } from "../../../src/rent"
import { User } from "../../../src/user"
import prisma from "../../../src/external/database/db"

describe('PrismaRentRepo', () => {
    beforeEach(async () => {
        await prisma.user.deleteMany({})
        await prisma.bike.deleteMany({})
        await prisma.rent.deleteMany({})
    })

    afterAll(async () => {
        await prisma.user.deleteMany({})
        await prisma.bike.deleteMany({})
        await prisma.rent.deleteMany({})
    })

    it('adds a rent to the database', async () => {
        const bike = await createBike()
        const user = await createUser()
        const rentToBePersisted = new Rent(
            bike, user, new Date()
        )
        const repo = new PrismaRentRepo()
        const rentId = await repo.add(rentToBePersisted)
        expect(rentId).toBeDefined()
    }, 10000)

    it('finds open rent for given bike and user', async () => {
        const bike = await createBike()
        const user = await createUser()
        const rentToBePersisted = new Rent(
            bike, user, new Date()
        )
        const repo = new PrismaRentRepo()
        const rentId = await repo.add(rentToBePersisted)
        const persistedRent = await repo.findOpen(
            bike.id,
            user.email
        )
        expect(persistedRent.id).toEqual(rentId)
    }, 10000)

    it('finds open rents for a given user', async () => {
        const bike = await createBike()
        const user = await createUser()
        const rentToBePersisted = new Rent(
            bike, user, new Date()
        )
        const repo = new PrismaRentRepo()
        await repo.add(rentToBePersisted)
        const openRents = await repo.findOpenFor(
            user.email
        )
        expect(openRents.length).toEqual(1)
    }, 10000)

    it('updates the end date of a rent in the database', async () => {
        const bike = await createBike()
        const user = await createUser()
        const rentToBePersisted = new Rent(
            bike, user, new Date()
        )
        const repo = new PrismaRentRepo()
        const rentId = await repo.add(rentToBePersisted)
        await repo.updateEnd(rentId, new Date())
        const persistedRent = await repo.find(rentId)
        expect(persistedRent.end).toBeDefined()
    }, 10000)
})

async function createBike(): Promise<Bike> {
    const bike = new Bike(
        'mountain bike',
        'mountain',
        20,
        100,
        10,
        'mountain bike',
        5,
        ['http://image1.com', 'http://image2.com'],
      )
    const bikeRepo = new PrismaBikeRepo()
    const bikeId = await bikeRepo.add(bike)
    return await bikeRepo.find(bikeId)
}

async function createUser(): Promise<User> {
    const userToBePersisted = new User(
        'test user',
        'test@mail.com',
        '1234'
    )
    const userRepo = new PrismaUserRepo()
    await userRepo.add(userToBePersisted)
    return await userRepo.find(userToBePersisted.email)
}