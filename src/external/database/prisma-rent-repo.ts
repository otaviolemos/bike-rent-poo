import { RentRepo } from "../../ports/rent-repo";
import { Rent } from "../../rent";
import prisma from "./db"

export class PrismaRentRepo implements RentRepo {
    async add(rent: Rent): Promise<string> {
        const persistedRent = await prisma.rent.create(
            {
                data: {
                    start: rent.start,
                    bike: {
                        connect: {
                            id: rent.bike.id
                        }
                    },
                    user: {
                        connect: {
                            id: rent.user.id
                        }
                    }
                }
            }
        )
        return persistedRent.id
    }

    async find(id: String): Promise<Rent> {
        return await prisma.rent.findUnique({
            where: { id },
            include: {
                bike: true,
                user: true
            }
        })
    } 

    async findOpen(bikeId: string, userEmail: string): Promise<Rent> {
        return await prisma.rent.findFirst({
            where: {
                AND: [
                    { bikeId },
                    { user: {
                        is: { email: userEmail }
                    }},
                    { end: null }
                ]
            },
            include: {
                bike: true,
                user: true
            }
        })
    }

    async findOpenFor(userEmail: string): Promise<Rent[]> {
        return await prisma.rent.findMany({
            where: {
                user: {
                    is: { email: userEmail }
                }
            },
            include: {
                bike: true,
                user: true
            }
        })
    }
    
    async updateEnd(id: string, end: Date): Promise<void> {
        await prisma.rent.update({
            where: { id },
            data: { end }
        })
    }
}