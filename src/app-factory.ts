import { App } from "./app";
import { PrismaBikeRepo } from "./external/database/prisma-bike-repo";
import { PrismaRentRepo } from "./external/database/prisma-rent-repo";
import { PrismaUserRepo } from "./external/database/prisma-user-repo";

if (!global.app) {
    global.app = new App(
        new PrismaUserRepo(),
        new PrismaBikeRepo(),
        new PrismaRentRepo()
    )
}

export default global.app;