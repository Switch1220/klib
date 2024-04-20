import { INestiaConfig } from "@nestia/sdk";
import { NestFactory } from "@nestjs/core";

import { KModule } from "./src/KModule";

export default {
  input: () => NestFactory.create(KModule),
  output: "src/api",
  swagger: {
    output: "packages/api/swagger.json",
    servers: [
      {
        url: "http://localhost:37001",
        description: "Local Server",
      },
    ],
    beautify: true,
  },
  primitive: false,
  simulate: true,
} satisfies INestiaConfig;
