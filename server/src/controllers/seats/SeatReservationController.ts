import core from "@nestia/core";
import { Controller } from "@nestjs/common";

import { IReserve } from "@kliber-api/lib/structures/seats/IReservation";

import { Auth } from "../../decorators/Auth";
import { SeatReservationProvider } from "../../providers/seats/SeatReservationProvider";
import { Jwt } from "../../utils/JwtTokenManager";

@Controller("seats/reservations")
export class SeatReservationController {
  /**
   * Create seat reservation
   *
   * @author Switch
   */
  @core.TypedRoute.Post()
  public async create(
    @Auth() token: Jwt,
    @core.TypedBody() input: IReserve.ICreate,
  ): Promise<IReserve> {
    return SeatReservationProvider.create({
      seatId: input.seatId,
      userId: token.id,
    });
  }
}
