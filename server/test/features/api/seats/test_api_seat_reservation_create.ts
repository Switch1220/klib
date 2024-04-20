import { RandomGenerator } from "@nestia/e2e";

import KlibApi from "@kliber-api/lib/index";
import { IReserve } from "@kliber-api/lib/structures/seats/IReservation";

export const test_api_seat_reservation_create = async (
  connection: KlibApi.IConnection,
): Promise<void> => {
  connection;

  // prepare input data
  const input: IReserve.ICreate = {
    seat_id: "",
    user_id: "",
  };

  input;
};
