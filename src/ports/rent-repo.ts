import { Rent } from "../rent";

export interface RentRepo {
    add(rent: Rent): Promise<string>
    find(id: String): Promise<Rent>
    findOpen(bikeId: string, userEmail: string): Promise<Rent>
    findOpenFor(userEmail: string): Promise<Rent[]>
    updateEnd(id: string, end: Date): Promise<void>
}