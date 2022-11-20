import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";

export async function userRoutes(fastify: FastifyInstance) {
  fastify.get("/users/count", async () => {
    const users = await prisma.user.count();

    return { count: users };
  });
}
