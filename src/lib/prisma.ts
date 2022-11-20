import { PrismaClient } from "@prisma/client";

// Realiza a conexão com o banco
export const prisma = new PrismaClient({
  log: ["query"],
});
