import { Bike } from "./bike";
import { Crypt } from "./crypt";
import { Rent } from "./rent";
import { User } from "./user";
import { Location } from "./location";
import { BikeNotFoundError } from "./errors/bike-not-found-error";
import { UnavailableBikeError } from "./errors/unavailable-bike-error";
import { UserNotFoundError } from "./errors/user-not-found-error";
import { DuplicateUserError } from "./errors/duplicate-user-error";
import { RentRepo } from "./ports/rent-repo";
import { UserRepo } from "./ports/user-repo";
import { BikeRepo } from "./ports/bike-repo";

export class App {
    crypt: Crypt = new Crypt()

    constructor(
        readonly userRepo: UserRepo,
        readonly bikeRepo: BikeRepo,
        readonly rentRepo: RentRepo
    ) { }

    async findUser(email: string): Promise<User> {
        const user = await this.userRepo.find(email)
        if (!user) throw new UserNotFoundError()
        return user
    }

    async registerUser(user: User): Promise<string> {
        if (await this.userRepo.find(user.email)) {
            throw new DuplicateUserError()
        }
        const encryptedPassword = await this.crypt.encrypt(user.password)
        user.password = encryptedPassword
        return await this.userRepo.add(user)
    }

    async authenticate(userEmail: string, password: string): Promise<boolean> {
        const user = await this.findUser(userEmail)
        return await this.crypt.compare(password, user.password)
    }

    async registerBike(bike: Bike): Promise<string> {
        return await this.bikeRepo.add(bike)
    }

    async removeUser(email: string): Promise<void> {
        const openRents = await this.rentRepo.findOpenRentsFor(email);
        if (openRents.length > 0) {
            throw new Error('User has open rents, cannot be removed.');
        }
        await this.findUser(email);
        await this.userRepo.remove(email);
    }


    async rentBike(bikeId: string, userEmail: string): Promise<string> {
        const bike = await this.findBike(bikeId)
        if (!bike.available) {
            throw new UnavailableBikeError()
        }
        const user = await this.findUser(userEmail)
        bike.available = false
        await this.bikeRepo.update(bikeId, bike)
        const newRent = new Rent(bike, user, new Date())
        return await this.rentRepo.add(newRent)
    }

    async returnBike(bikeId: string, userEmail: string): Promise<number> {
        const now = new Date()
        const rent = await this.rentRepo.findOpen(bikeId, userEmail)
        if (!rent) throw new Error('Rent not found.')
        rent.end = now
        await this.rentRepo.update(rent.id, rent)
        rent.bike.available = true
        await this.bikeRepo.update(rent.bike.id, rent.bike)
        const hours = diffHours(rent.end, rent.start)
        return hours * rent.bike.rate
    }

    async listUsers(): Promise<User[]> {
        return await this.userRepo.list()
    }

    async listBikes(): Promise<Bike[]> {
        return await this.bikeRepo.list()
    }

    async moveBikeTo(bikeId: string, location: Location) {
        const bike = await this.findBike(bikeId)
        bike.location.latitude = location.latitude
        bike.location.longitude = location.longitude
        await this.bikeRepo.update(bikeId, bike)
    }

    async findBike(bikeId: string): Promise<Bike> {
        const bike = await this.bikeRepo.find(bikeId)
        if (!bike) throw new BikeNotFoundError()
        return bike
    }
}

function diffHours(dt2: Date, dt1: Date) {
    var diff = (dt2.getTime() - dt1.getTime()) / 1000;
    diff /= (60 * 60);
    return Math.abs(diff);
}