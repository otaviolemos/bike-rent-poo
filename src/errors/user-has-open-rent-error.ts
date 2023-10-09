export class UserHasOpenRentError extends Error {
    public readonly name = 'UserHasOpenRentError'

    constructor() {
        super('User has open rent.')
    }
}