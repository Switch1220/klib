import { RandomGenerator, TestValidator } from "@nestia/e2e";
import typia from "typia";

import KlibApi from "@kliber-api/lib/index";
import { IUser } from "@kliber-api/lib/structures/users/IUser";

export const test_api_user_create = async (
  connection: KlibApi.IConnection,
): Promise<void> => {
  // prepare header object
  connection.headers = {};

  // prepare input data
  const input: IUser.ICreate = {
    username: RandomGenerator.alphaNumeric(8),
    password: RandomGenerator.alphaNumeric(8),
    name: RandomGenerator.name(),
  };

  // create a new user with input
  const token = await KlibApi.functional.auth.signup(connection, input);
  typia.assertEquals(token);

  connection.headers["authorization"] = `Bearer ${token.access}`;

  const user = await KlibApi.functional.users.at(connection);

  // should pass
  TestValidator.equals("read")({
    name: input.name,
    username: input.username,
  })(user);

  // set invalid token
  connection.headers["authorization"] = `Bearer ${token.refresh}`;

  await TestValidator.httpError("invalid signature")(401)(() =>
    KlibApi.functional.users.at(connection),
  );

  // set malformed token (the token does not have three components)
  connection.headers["authorization"] = `Bearer asdf.asdf`;

  await TestValidator.httpError("jwt malformed")(401)(() =>
    KlibApi.functional.users.at(connection),
  );
};
