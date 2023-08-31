import { PrismaClient } from "@prisma/client"

let prisma: PrismaClient

export function getDatabaseConnection() {
    if(!prisma) {
        prisma = new PrismaClient()
    }
    return prisma
}
