import { Module } from "@nestjs/common";

import { DevicesModule } from "./controllers/devices/DevicesModule";
import { MonitorModule } from "./controllers/monitors/MonitorModule";
import { SeatsModule } from "./controllers/seats/SeatsModule";
import { UsersModule } from "./controllers/users/UsersModule";

@Module({
  imports: [DevicesModule, MonitorModule, SeatsModule, UsersModule],
})
export class KModule {}
