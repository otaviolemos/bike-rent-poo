import { Bike } from "../../src/bike";
import { BikeRepo } from "../../src/ports/bike-repo";
import crypto from 'crypto'

export class FakeBikeRepo implements BikeRepo {
    bikes: Bike[] = []

    async find(id: string): Promise<Bike> {
        return this.bikes.find(bike => bike.id === id)
    }

    async add(bike: Bike): Promise<string> {
        const newId = crypto.randomUUID()
        bike.id = newId
        this.bikes.push(bike)
        return newId
    }

    async remove(id: string): Promise<void> {
        const bikeIndex = this.bikes.findIndex(bike => 
            bike.id === id)
        if (bikeIndex !== -1) this.bikes.splice(bikeIndex, 1)
    }

    async list(): Promise<Bike[]> {
        return this.bikes
    }

    async update(id: string, bike: Bike): Promise<void> {
        const bikeIndex = this.bikes.findIndex(bike => bike.id === id)
        if (bikeIndex !== -1) this.bikes[bikeIndex] = bike
    }
}