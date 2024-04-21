import core from "@nestia/core";
import { Controller } from "@nestjs/common";

import { IToken } from "@kliber-api/lib/structures/users/IToken";
import { IUser } from "@kliber-api/lib/structures/users/IUser";

import { AuthProvider } from "../../providers/users/AuthProvider";

@Controller("auth")
export class AuthController {
  @core.TypedRoute.Post("signup")
  signup(@core.TypedBody() input: IUser.ICreate): Promise<IToken> {
    return AuthProvider.signup(input);
  }

  @core.TypedRoute.Post("signin")
  signin(@core.TypedBody() input: IUser.IRequest.ISearch): Promise<IToken> {
    return AuthProvider.signin(input);
  }
}
