import { Prisma } from "@prisma/client";
import { v4 } from "uuid";

import { IDevice } from "@kliber-api/lib/structures/devices/IDevice";

import { KGlobal } from "../../KGlobal";

export namespace DevicesProvider {
  export namespace json {
    export const transform = (
      input: Prisma.seat_nodeGetPayload<ReturnType<typeof select>>,
    ): IDevice => ({
      deviceId: input.id,
    });

    export const select = () =>
      ({
        include: {} as const,
      }) satisfies Prisma.seat_nodeFindManyArgs;
  }

  export const register = async (): Promise<IDevice> => {
    const record = await KGlobal.prisma.seat_node.create({
      data: {
        id: v4(),
        device_id: v4(),
      },
    });

    return json.transform(record);
  };
}
