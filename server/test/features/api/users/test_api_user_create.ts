import { RandomGenerator, TestValidator } from "@nestia/e2e";
import typia from "typia";

import KlibApi from "@kliber-api/lib/index";
import { IUser } from "@kliber-api/lib/structures/users/IUser";

export const test_api_user_create = async (
  connection: KlibApi.IConnection,
): Promise<void> => {
  // prepare input data
  const input: IUser.ICreate = {
    username: RandomGenerator.alphaNumeric(8),
    password: RandomGenerator.alphaNumeric(8),
    name: RandomGenerator.name(),
  };

  // create a new user with input
  const user = await KlibApi.functional.users.create(connection, input);
  typia.assertEquals(user);

  // check if inserted data matches input exactly
  TestValidator.equals("create")({
    name: input.name,
    username: input.username,
  })(user);

  // compare user with retrieved data
  const read = await KlibApi.functional.users.at(connection, user.id);
  typia.assertEquals(read);
  TestValidator.equals("read")(read)(user);
};
