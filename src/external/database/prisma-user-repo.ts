import { UserRepo } from "../../ports/user-repo";
import { User } from "../../user";
import prisma from "./db"

export class PrismaUserRepo implements UserRepo {

    async find(email: string): Promise<User> {
        return await prisma.user.findFirst({
            where: { email }
        })
    }

    async add(user: User): Promise<string> {
        const addedUser = await prisma.user.create({
            data: { ...user }
        })
        return addedUser.id
    }

    async remove(email: string): Promise<void> {
        await prisma.user.delete({
            where: { email }
        })
    }

    async list(): Promise<User[]> {
        return await prisma.user.findMany({})
    }
}