import type { Prisma } from "@prisma/client";
import { v4 } from "uuid";

import { IReserve } from "@kliber-api/lib/structures/seats/IReservation";

import { KGlobal } from "../../KGlobal";
import { ErrorProvider } from "../common/ErrorProvider";

export namespace SeatReservationProvider {
  /* -----------------------------------------------------------
    TRANSFORMERS
  ----------------------------------------------------------- */
  export namespace json {
    export const transform = (
      input: Prisma.seat_reservationsGetPayload<ReturnType<typeof select>>,
    ): IReserve => ({
      id: input.id,

      startAt: input.start_at.toISOString(),
      endAt: input.end_at.toISOString(),
    });

    export const select = () =>
      ({
        include: {} as const,
      }) satisfies Prisma.seat_reservationsFindManyArgs;
  }

  /* -----------------------------------------------------------
    WRITERS
  ----------------------------------------------------------- */
  export const cancel = async (
    seatReservationId: string,
    userId: string,
  ): Promise<void> => {
    // validate seat reservation id
    await KGlobal.prisma.seat_reservations.findFirstOrThrow({
      where: { id: seatReservationId },
    });

    const record = await KGlobal.prisma.seat_reservations.update({
      where: { id: seatReservationId },
      data: { canceled_at: new Date() },
    });

    if (record.user_id !== userId) {
      throw ErrorProvider.forbidden({
        accessor: "userId",
        message:
          "Unauthorized user. You are not authorized to cancel this reservation.",
      });
    }
  };

  export const create = async (
    input: IReserve.ICreate & { userId: string },
  ): Promise<IReserve> => {
    // The userId can already be assumed to be valid due to preceded jwt validation.
    // So no need to validate userId.

    // validate seat id
    await KGlobal.prisma.seat.findFirstOrThrow({
      where: {
        id: input.seatId,
      },
    });

    if ((await canReserveSeat(input.seatId)) === false) {
      throw ErrorProvider.conflict({
        accessor: "input.seatId",
        message: "Seat is already reserved",
      });
    }

    // Issue a new reservation
    const record = await KGlobal.prisma.seat_reservations.create({
      data: {
        id: v4(),
        seat_id: input.seatId,
        user_id: input.userId,
        start_at: new Date(),
        // Add one hour from the current time
        end_at: new Date(Date.now() + 1 * 60 * 60 * 1000),
      },
    });

    return json.transform(record);
  };

  /**
   * Check if the target seat is available.
   * The conditions for issuing a new reservation are that the latest record is null or the end date of the latest record has already passed.
   */
  const canReserveSeat = async (seatId: string): Promise<boolean> => {
    const latest = await KGlobal.prisma.seat_reservations.findFirst({
      where: { seat_id: seatId, canceled_at: null },
      orderBy: {
        end_at: "desc",
      },
    });

    if (latest === null) {
      return true;
    }

    if (latest.end_at > new Date()) {
      return false;
    }

    return true;
  };
}
