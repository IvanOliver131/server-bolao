import Fastify from "fastify";
import cors from "@fastify/cors";
import jwt from "@fastify/jwt";
import * as dotenv from "dotenv";

import { poolRoutes } from "./routes/pool";
import { guessRoutes } from "./routes/guess";
import { userRoutes } from "./routes/user";
import { authRoutes } from "./routes/auth";
import { gameRoutes } from "./routes/game";

// BOLÃO É POLL - REMEMBER

async function bootstrap() {
  dotenv.config(); // Load the environment variables
  const secretJwt = process.env.SECRET_JWT;

  const fastify = Fastify({
    logger: true,
  });

  // Depois devemos mudar para a URL onde ficará hospedado o frontend
  await fastify.register(cors, {
    origin: true,
  });

  // Em produção isso deve ser uma variável de ambiente
  if (secretJwt) {
    await fastify.register(jwt, {
      secret: secretJwt,
    });
  }

  await fastify.register(authRoutes);
  await fastify.register(gameRoutes);
  await fastify.register(guessRoutes);
  await fastify.register(poolRoutes);
  await fastify.register(userRoutes);

  await fastify.listen({ port: 3333, host: "0.0.0.0" });
}

bootstrap();
