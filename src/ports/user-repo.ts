import { User } from "../user";

export interface UserRepo {
    find(email: string): Promise<User>
    add(user: User): Promise<string>
    remove(email: string): Promise<void>
    list(): Promise<User[]>
}
