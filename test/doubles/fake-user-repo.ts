import { UserRepo } from "../../src/ports/user-repo";
import { User } from "../../src/user";
import crypto from 'crypto'

export class FakeUserRepo implements UserRepo {
    users: User[] = []

    async find(email: string): Promise<User> {
        return this.users.find(user => user.email === email)
    }

    async add(user: User): Promise<string> {
        const newId = crypto.randomUUID()
        user.id = newId
        this.users.push(user)
        return newId
    }

    async remove(email: string): Promise<void> {
        const userIndex = this.users.findIndex(user => user.email === email)
        if (userIndex !== -1) this.users.splice(userIndex, 1)
    }

    async list(): Promise<User[]> {
        return this.users
    }
}