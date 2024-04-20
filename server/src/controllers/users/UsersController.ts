import core from "@nestia/core";
import { Controller } from "@nestjs/common";
import { tags } from "typia";

import { IUser } from "@kliber-api/lib/structures/users/IUser";

@Controller("users")
export class UsersController {
  /**
   * Read user
   *
   * @author Switch
   */
  @core.TypedRoute.Get(":id")
  public at(
    @core.TypedParam("id") id: string & tags.Format<"uuid">,
  ): Promise<IUser> {
    id;
    return null!;
  }

  /**
   * Create a new user
   *
   * @author Switch
   */
  @core.TypedRoute.Post()
  public async create(@core.TypedBody() input: IUser.ICreate): Promise<IUser> {
    input;
    return null!;
  }
}
