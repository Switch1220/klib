import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import {
  JsonWebTokenError,
  NotBeforeError,
  TokenExpiredError,
} from "jsonwebtoken";
import { IncomingHttpHeaders, IncomingMessage } from "node:http";

import { ErrorProvider } from "../providers/common/ErrorProvider";
import { Jwt, JwtUtil } from "../utils/JwtTokenManager";

export namespace AuthUtil {
  export const authorize = async (
    request: IncomingMessage & { token?: Jwt },
  ): Promise<Jwt> => {
    const token = getToken(request);

    try {
      return await JwtUtil.verify("access")(token);
    } catch (e) {
      let message: string;

      // errors can be thrown by JwtUtil.verify are specified in
      // https://github.com/auth0/node-jsonwebtoken?tab=readme-ov-file#errors--codes
      switch (true) {
        case e instanceof TokenExpiredError:
          message = `${e.message} expiredAt: ${e.expiredAt}`;
          break;
        case e instanceof JsonWebTokenError:
          message = e.message;
          break;
        case e instanceof NotBeforeError:
          message = e.message;
          break;
        default:
          throw ErrorProvider.internal({
            accessor: "jwt",
            message: "Unknown error occured.",
          });
      }

      throw ErrorProvider.unauthorized({
        accessor: "header.authorization",
        message: message,
      });
    }
  };

  const getToken = (request: { headers: IncomingHttpHeaders }): string => {
    const authorization = request.headers["authorization"];

    if (!authorization || Array.isArray(authorization)) {
      throw ErrorProvider.forbidden({
        accessor: "header.authorization",
        message: "Invalid Authorization Header",
      });
    }

    const [_, token] = authorization.split(" ");

    return token;
  };
}

/**
 *
 */
export const Auth = createParamDecorator(
  async (data: keyof Jwt | undefined, ctx: ExecutionContext) => {
    const request = ctx
      .switchToHttp()
      .getRequest<IncomingMessage & { token?: Jwt }>();

    const token = await AuthUtil.authorize(request);

    return data ? token[data] : token;
  },
);
