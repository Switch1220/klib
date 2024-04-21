import jwt from "jsonwebtoken";

import { KGlobal } from "../KGlobal";

export type Jwt = JwtTokenManager.IAsset;

export namespace JwtTokenManager {
  export type Type = "access" | "refresh";
  export interface IPassword {
    access: string;
    refresh: string;
  }
  export interface IProps {
    // table: string;
    // readonly: boolean;

    // User's id
    id: string;
    expired_at?: string;
    refreshable_until?: string;
  }
  export type IAsset = Required<IProps>;
  export interface IOutput extends IAsset {
    access: string;
    refresh: string;
  }

  export const generate =
    (password: IPassword) =>
    async (props: IProps): Promise<IOutput> => {
      const asset: IAsset = {
        // table: props.table,
        id: props.id,
        // readonly: props.readonly,
        expired_at:
          props.expired_at ??
          new Date(Date.now() + EXPIRATIONS.ACCESS).toISOString(),
        refreshable_until:
          props.refreshable_until ??
          new Date(Date.now() + EXPIRATIONS.REFRESH).toISOString(),
      };
      const [access, refresh] = [password.access, password.refresh].map((key) =>
        jwt.sign(asset, key),
      );
      return {
        ...asset,
        access,
        refresh,
      };
    };

  export const verify =
    (password: IPassword) =>
    (type: Type) =>
    async (token: string): Promise<IAsset> =>
      jwt.verify(token, password[type]) as IAsset;

  export const EXPIRATIONS = {
    ACCESS: 3 * 60 * 60 * 1000,
    REFRESH: 2 * 7 * 24 * 60 * 60 * 1000,
  };
}

export namespace JwtUtil {
  export const verify = (type: JwtTokenManager.Type) => async (token: string) =>
    JwtTokenManager.verify({
      access: KGlobal.env.JWT_ACCESS_SECRET,
      refresh: KGlobal.env.JWT_REFRESH_SECRET,
    })(type)(token);

  export const generate = async (props: JwtTokenManager.IProps) =>
    JwtTokenManager.generate({
      access: KGlobal.env.JWT_ACCESS_SECRET,
      refresh: KGlobal.env.JWT_REFRESH_SECRET,
    })(props);
}
