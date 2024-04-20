import core from "@nestia/core";
import { Controller } from "@nestjs/common";

import { IReserve } from "@kliber-api/lib/structures/seats/IReservation";

@Controller("seats/reservations")
export class SeatReservationController {
  /**
   * Create seat reservation
   *
   * @author Switch
   */
  @core.TypedRoute.Post()
  public async create(
    @core.TypedBody() input: IReserve.ICreate,
  ): Promise<IReserve> {
    input;
    return null!;
  }
}
