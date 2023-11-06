// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id       String @id @default(uuid())
  name     String
  email    String @unique
  password String
}

model Bike {
  id          String     @id @default(uuid())
  name        String
  type        String
  bodySize    Int
  maxLoad     Int
  rate        Float
  description String
  ratings     Int
  available   Boolean
  latitude    Float
  longitude   Float
  imageUrls   ImageUrl[]
}

model ImageUrl {
  id     String @id @default(uuid())
  url    String
  bike   Bike   @relation(fields: [bikeId], references: [id], onDelete: Cascade)
  bikeId String
}
