import { App } from "./app";
import { Bike } from "./bike";
import { Rent } from "./rent";
import { User } from "./user";

const app = new App()
const user1 = new User('Jose', 'jose@mail.com', '1234')
const user2 = new User('Maria', 'maria@mail.com', '1234')
const user1Id = app.registerUser(user1)
const user2Id = app.registerUser(user2)
console.log(app.users)

const bike = new Bike('caloi mountain', 'mountain bike', 123, 200, 100.5, 'My bike', 5, [])
const bikeId = app.registerBike(bike)
console.log(app.bikes)

const today = new Date()
const yesterday = new Date()
yesterday.setDate(yesterday.getDate() - 1)
const tomorrow = new Date()
tomorrow.setDate(tomorrow.getDate() + 1)
const dayAfterTomorrow = new Date()
dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2)
const threeDaysFromToday = new Date()
threeDaysFromToday.setDate(threeDaysFromToday.getDate() + 3)
const fourDaysFromToday = new Date()
fourDaysFromToday.setDate(fourDaysFromToday.getDate() + 4)

app.rentBike(bikeId, 'jose@mail.com', yesterday, today)

console.log('Before return', app.rents)

app.returnBike(bikeId, 'jose@mail.com')

console.log('After return', app.rents)




