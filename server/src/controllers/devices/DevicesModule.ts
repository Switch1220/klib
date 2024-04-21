import { Module } from "@nestjs/common";

import { DevicesGateway } from "./DevicesGateway";

@Module({
  providers: [DevicesGateway],
})
export class DevicesModule {}
