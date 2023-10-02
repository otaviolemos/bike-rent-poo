export class RentNotFoundError extends Error {
    public readonly name = 'RentNotFoundError'

    constructor() {
        super('Rent not found.')
    }
}