import { createClient } from "@libsql/client";
import { PrismaClient } from "@prisma/client";
import { PrismaLibSQL } from "@prisma/adapter-libsql";

const prismaClientSingleton = () => {
  const libsql = createClient({
    url: "libsql://gifties-gifties.turso.io",
    authToken: process.env.TURSO_AUTH!,
  });

  const adapter = new PrismaLibSQL(libsql);
  return new PrismaClient({ adapter });
};

declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>;
}

export const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;
