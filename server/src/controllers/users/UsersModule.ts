import { Module } from "@nestjs/common";

import { AuthController } from "./AuthController";
import { UsersController } from "./UsersController";

@Module({
  controllers: [AuthController, UsersController],
})
export class UsersModule {}
