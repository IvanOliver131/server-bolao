import Fastify from "fastify";
import cors from "@fastify/cors";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import ShortUniqueId from "short-unique-id";

// Realiza a conexão com o banco
const prisma = new PrismaClient({
  log: ["query"],
});

async function bootstrap() {
  const fastify = Fastify({
    logger: true,
  });

  // Depois devemos mudar para a URL onde ficará hospedado o frontend
  await fastify.register(cors, {
    origin: true,
  });

  fastify.get("/pools/count", async () => {
    const pools = await prisma.pool.count();

    return pools;
  });

  fastify.post("/pools", async (request, reply) => {
    const createPoolBody = z.object({
      title: z.string(),
    });

    try {
      const { title } = createPoolBody.parse(request.body);
      const generate = new ShortUniqueId({ length: 6 });
      const code = String(generate()).toUpperCase();

      await prisma.pool.create({
        data: {
          title,
          code,
        },
      });

      return reply.status(201).send({ code, msg: "Bolão criado com sucesso!" });
    } catch (error) {
      return reply.send({ msg: "Erro ao criar bolão!" });
    }
  });

  fastify.get("/users/count", async () => {
    const users = await prisma.user.count();

    return users;
  });

  fastify.get("/guesses/count", async () => {
    const guesses = await prisma.guess.count();

    return guesses;
  });

  await fastify.listen({ port: 3333, host: "0.0.0.0" });
}

bootstrap();
