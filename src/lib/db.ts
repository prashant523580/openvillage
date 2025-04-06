import { PrismaClient } from '@prisma/client'
// import { PrismaClient } from '../generated/client'
const prismaClientSingleton = () => {
  return new PrismaClient()
}

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

export default prisma
// declare module '@next-auth/prisma-adapter' {
//   interface PrismaUser extends Prisma.User {}
// }
if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma