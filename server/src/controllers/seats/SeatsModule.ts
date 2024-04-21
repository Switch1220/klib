import { Module } from "@nestjs/common";

import { SeatReservationController } from "./SeatReservationController";
import { SeatsController } from "./SeatsController";

@Module({
  controllers: [SeatsController, SeatReservationController],
})
export class SeatsModule {}
