import Fastify from "fastify";
import cors from "@fastify/cors";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  log: ["query"],
});

async function bootstrap() {
  const fastify = Fastify({
    logger: true,
  });

  // Depois devemos mudar para a URL onde ficara hospedado o frontend
  await fastify.register(cors, {
    origin: true,
  });

  fastify.get("/pools/count", async () => {
    const pools = await prisma.pool.count();

    return pools;
  });

  await fastify.listen({ port: 3333, host: "0.0.0.0" });
}

bootstrap();
