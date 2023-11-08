import { App } from "./app";
import { Bike } from "./bike";
import { PrismaBikeRepo } from "./external/database/prisma-bike-repo";
import { PrismaRentRepo } from "./external/database/prisma-rent-repo";
import { PrismaUserRepo } from "./external/database/prisma-user-repo";
import { Rent } from "./rent";
import { User } from "./user";
import sinon from 'sinon'

async function main() {
    const clock = sinon.useFakeTimers();
    const userRepo = new PrismaUserRepo()
    const bikeRepo = new PrismaBikeRepo()
    const rentRepo = new PrismaRentRepo()
    const app = new App(userRepo, bikeRepo, rentRepo)
    const user1 = new User('Jose', 'jose@mail.com', '1234')
    const bikeId = await app.registerUser(user1)
    const bike = new Bike('caloi mountainbike', 'mountain bike',
        1234, 1234, 100.0, 'My bike', 5, [])
    app.registerBike(bike)
    let persistedBike = await bikeRepo.find(bikeId)
    console.log('Bike disponível: ', bike.available)
    await app.rentBike(bike.id, user1.email)
    persistedBike = await bikeRepo.find(bikeId)
    console.log('Bike disponível: ', bike.available)
    clock.tick(1000 * 60 * 65)
    console.log(await app.returnBike(bike.id, user1.email))
    persistedBike = await bikeRepo.find(bikeId)
    console.log('Bike disponível: ', bike.available)
}

main()








