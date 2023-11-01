import { PrismaUserRepo } from "../../../src/external/database/prisma-user-repo"
import { User } from "../../../src/user"
import prisma from "../../../src/external/database/db"

describe('PrismaUserRepo', () => {
    beforeEach(async () => {
        await prisma.user.deleteMany({})
    })

    afterAll(async () => {
        await prisma.user.deleteMany({})
    })

    it('adds a user in the database', async () => {
        const userToBePersisted = new User(
            'test user',
            'test@mail.com',
            '1234'
        )
        const repo = new PrismaUserRepo()
        const userId = await repo.add(userToBePersisted)
        expect(userId).toBeDefined()
        const persistedUser = await repo.find(userToBePersisted.email)
        expect(persistedUser.name).toEqual(
            userToBePersisted.name
        )
    })

    it('removes a user from the database', async () => {
        const userToBePersisted = new User(
            'test user',
            'test@mail.com',
            '1234'
        )
        const repo = new PrismaUserRepo()
        await repo.add(userToBePersisted)
        await repo.remove('test@mail.com')
        const removedUser = await repo.find('test@mail.com')
        expect(removedUser).toBeNull()
    })

    it('lists users in the database', async () => {
        const user1 = new User('user1', 'user1@mail.com', '1234')
        const user2 = new User('user2', 'user2@mail.com', '1234')
        const repo = new PrismaUserRepo()
        await repo.add(user1)
        await repo.add(user2)
        const userList = await repo.list()
        expect(userList.length).toEqual(2)
    })
})