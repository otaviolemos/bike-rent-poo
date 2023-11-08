import { BikeRepo } from "../../ports/bike-repo";
import { Location } from "../../location";
import prisma from "./db";

export class PrismaBikeRepo implements BikeRepo {
    async find(id: string): Promise<any> {
      const persistedBike = await prisma.bike.findUnique({
        where: {
          id
        },
        include: {
          imageUrls: true,
        }
      })

      if (!persistedBike) return null

      return {
        ...persistedBike,
        location: new Location(persistedBike.latitude, persistedBike.longitude)
      }
    }

    async add(bike: any): Promise<string> {
      const addedBike = await prisma.bike.create({
        data: {
          name: bike.name,
          type: bike.type,
          bodySize: bike.bodySize,
          maxLoad: bike.maxLoad,
          rate: bike.rate,
          description: bike.description,
          ratings: bike.ratings,
          imageUrls: {
            create: [
              ...bike.imageUrls.map((url: string) => ({ url }))
            ]
          },
          available: bike.available,
          latitude: bike.location.latitude,
          longitude: bike.location.longitude,
        }
      })
      return addedBike.id
    }

    async remove(id: string): Promise<void> {
      await prisma.bike.delete({
        where: {
          id
        }
      })
    }

    async list(): Promise<any[]> {
      return await prisma.bike.findMany({
        include: {
          imageUrls: true,
        }
      })
    }

    async updateAvailability(id: string, available: boolean): Promise<void> {
      await prisma.bike.update({
        where: { id },
        data: { available }
      })
    }

    async updateLocation(id: string, latitude: number, longitude: number): Promise<void> {
      await prisma.bike.update({
        where: { id },
        data: {
          latitude,
          longitude
        }
      })
    }
}