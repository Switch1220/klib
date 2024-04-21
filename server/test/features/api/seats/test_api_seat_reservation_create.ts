import { RandomGenerator, TestValidator } from "@nestia/e2e";
import typia from "typia";

import KlibApi from "@kliber-api/lib/index";
import { IReserve } from "@kliber-api/lib/structures/seats/IReservation";
import { IUser } from "@kliber-api/lib/structures/users/IUser";

export const test_api_seat_reservation_create = async (
  connection: KlibApi.IConnection,
): Promise<void> => {
  // prepare header object
  connection.headers = {};

  // prepare seats
  const seats = await Promise.all([
    KlibApi.functional.seats.create(connection, {
      coordinateX: Math.random() * 25,
      coordinateY: Math.random() * 25,
    }),
    KlibApi.functional.seats.create(connection, {
      coordinateX: Math.random() * 25,
      coordinateY: Math.random() * 25,
    }),
    KlibApi.functional.seats.create(connection, {
      coordinateX: Math.random() * 25,
      coordinateY: Math.random() * 25,
    }),
  ]);

  // prepare input data
  const userA: IUser.ICreate = {
    username: RandomGenerator.alphaNumeric(8),
    password: RandomGenerator.alphaNumeric(8),
    name: RandomGenerator.name(),
  };

  // create a first user
  const tokenA = await KlibApi.functional.auth.signup(connection, userA);
  typia.assertEquals(tokenA);

  // add token to connection header
  connection.headers["authorization"] = `Bearer ${tokenA.access}`;

  // prepare input data
  const input: IReserve.ICreate = {
    seatId: seats[0].id,
  };

  // make a first reservation
  const first = await KlibApi.functional.seats.reservations.create(
    connection,
    input,
  );

  first;

  const userB: IUser.ICreate = {
    username: RandomGenerator.alphaNumeric(8),
    password: RandomGenerator.alphaNumeric(8),
    name: RandomGenerator.name(),
  };

  // create a second user
  const tokenB = await KlibApi.functional.auth.signup(connection, userB);
  typia.assertEquals(tokenB);

  // add token to connection header
  connection.headers["authorization"] = `Bearer ${tokenB.access}`;

  // make a second reservation with the same seat id which can not be issued
  await TestValidator.httpError("reservation conflict")(409)(async () => {
    await KlibApi.functional.seats.reservations.create(connection, input);
  });
};
