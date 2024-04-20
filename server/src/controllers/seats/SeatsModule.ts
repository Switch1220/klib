import { Module } from "@nestjs/common";

import { SeatReservationController } from "./SeatReservationController";

@Module({
  controllers: [SeatReservationController],
})
export class SeatsModule {}
