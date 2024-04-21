import { v4 } from "uuid";

import { IToken } from "@kliber-api/lib/structures/users/IToken";
import { IUser } from "@kliber-api/lib/structures/users/IUser";

import { KGlobal } from "../../KGlobal";
import { BcryptUtil } from "../../utils/BcryptUtil";
import { JwtTokenManager, JwtUtil } from "../../utils/JwtTokenManager";
import { ErrorProvider } from "../common/ErrorProvider";

export namespace AuthProvider {
  export namespace json {
    export const transform = (input: JwtTokenManager.IOutput): IToken => ({
      access: input.access,
      refresh: input.refresh,
    });
  }

  export const signup = async (input: IUser.ICreate): Promise<IToken> => {
    const record = await KGlobal.prisma.user.create({
      data: {
        id: v4(),
        username: input.username,
        password: await BcryptUtil.hash(input.password),
        name: input.name,
        created_at: new Date(),
      },
    });

    const output = await JwtUtil.generate({ id: record.id });

    return json.transform(output);
  };

  export const signin = async (input: IUser.IRequest.ISearch) => {
    const record = await KGlobal.prisma.user.findFirstOrThrow({
      where: { username: input.username, deleted_at: null },
    });

    if (
      (await BcryptUtil.equals({
        input: input.password,
        hashed: record.password,
      })) === false
    ) {
      throw ErrorProvider.forbidden({
        accessor: "input.password",
        message: "Wrong password.",
      });
    }

    const output = await JwtUtil.generate({ id: record.id });

    return json.transform(output);
  };
}
