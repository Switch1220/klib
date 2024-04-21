import type { Prisma } from "@prisma/client";

import { IUser } from "@kliber-api/lib/structures/users/IUser";

import { KGlobal } from "../../KGlobal";

export namespace UsersProvider {
  /* -----------------------------------------------------------
    TRANSFORMERS
  ----------------------------------------------------------- */
  export namespace json {
    export const transform = (
      input: Prisma.userGetPayload<ReturnType<typeof select>>,
    ): IUser => ({
      id: input.id,

      username: input.username,
      name: input.name,

      created_at: input.created_at.toISOString(),
    });

    export const select = () =>
      ({
        include: {} as const,
      }) satisfies Prisma.userFindManyArgs;
  }

  /* -----------------------------------------------------------
    READERS
  ----------------------------------------------------------- */
  export const at = async (id: string): Promise<IUser> => {
    const record = await KGlobal.prisma.user.findFirstOrThrow({
      where: {
        id: id,
        deleted_at: null,
      },
    });

    return json.transform(record);
  };
}
