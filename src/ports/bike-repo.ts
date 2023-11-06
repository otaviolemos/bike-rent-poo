import { Bike } from "../bike"

export interface BikeRepo {
    find(id: string): Promise<Bike>
    add(bike: Bike): Promise<string>
    remove(id: string): Promise<void>
    updateAvailability(id: string, available: boolean): Promise<void>
    updateLocation(id: string, latitude: number, longitude: number): Promise<void>
    list(): Promise<Bike[]>
}