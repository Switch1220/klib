import core from "@nestia/core";
import { Controller } from "@nestjs/common";

import { IUser } from "@kliber-api/lib/structures/users/IUser";

import { Auth } from "../../decorators/Auth";
import { UsersProvider } from "../../providers/users/UsersProvider";
import { Jwt } from "../../utils/JwtTokenManager";

@Controller("users")
export class UsersController {
  /**
   * Read user
   *
   * @author Switch
   */
  @core.TypedRoute.Get()
  public at(@Auth() token: Jwt): Promise<IUser> {
    return UsersProvider.at(token.id);
  }
}
