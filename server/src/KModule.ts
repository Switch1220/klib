import { Module } from "@nestjs/common";

import { MonitorModule } from "./controllers/monitors/MonitorModule";
import { SeatsModule } from "./controllers/seats/SeatsModule";
import { UsersModule } from "./controllers/users/UsersModule";

@Module({
  imports: [MonitorModule, SeatsModule, UsersModule],
})
export class KModule {}
