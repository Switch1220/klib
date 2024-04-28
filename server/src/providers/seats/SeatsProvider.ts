import type { Prisma } from "@prisma/client";
import { v4 } from "uuid";

import { ISeat } from "@kliber-api/lib/structures/seats/ISeat";

import { KGlobal } from "../../KGlobal";

export namespace SeatsProvider {
  /* -----------------------------------------------------------
    TRANSFORMERS
  ----------------------------------------------------------- */
  export namespace json {
    export const transform = (
      input: Prisma.seatGetPayload<ReturnType<typeof select>>,
    ): ISeat => ({
      id: input.id,

      coordinateX: input.info?.coordinate_x,
      coordinateY: input.info?.coordinate_y,
    });

    export const select = () =>
      ({
        include: {
          info: true,
        } as const,
      }) satisfies Prisma.seatFindManyArgs;
  }

  /* -----------------------------------------------------------
    READERS
  ----------------------------------------------------------- */
  export const index = async (): Promise<ISeat[]> => {
    const records = await KGlobal.prisma.seat.findMany(json.select());

    return records.map(json.transform);
  };

  /* -----------------------------------------------------------
    WRITERS
  ----------------------------------------------------------- */
  export const create = async (input: ISeat.ICreate): Promise<ISeat> => {
    // Create a new seat
    const record = await KGlobal.prisma.seat.create({
      data: {
        id: v4(),
        info: {
          create: {
            id: v4(),
            coordinate_x: input.coordinateX,
            coordinate_y: input.coordinateY,
          },
        },
      },
      ...json.select(),
    });

    return json.transform(record);
  };
}
