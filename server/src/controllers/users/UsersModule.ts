import { Module } from "@nestjs/common";

import { UsersController } from "./UsersController";

@Module({
  controllers: [UsersController],
})
export class UsersModule {}
