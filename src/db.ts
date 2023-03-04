import { PrismaClient } from "@prisma/client";

//defining the ORM objects that will interact with the hosted postgres db
const prisma = new PrismaClient

export default prisma