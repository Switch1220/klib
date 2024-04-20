import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import dotenvExpand from "dotenv-expand";
import { Singleton } from "tstl";
import typia from "typia";

/**
 * Global variables of the server.
 */
export class KGlobal {
  public static testing: boolean = false;

  public static readonly prisma: PrismaClient = new PrismaClient();

  public static get env(): IEnvironments {
    return environments.get();
  }

  /**
   * Current mode.
   *
   *   - local: The server is on your local machine.
   *   - dev: The server is for the developer.
   *   - prod: The server is for the production service.
   */
  public static get mode(): "local" | "dev" | "prod" {
    return (modeWrapper.value ??= environments.get().MODE);
  }

  /**
   * Set current mode.
   *
   * @param mode The new mode
   */
  public static setMode(mode: typeof KGlobal.mode): void {
    typia.assert<typeof mode>(mode);
    modeWrapper.value = mode;
  }
}
interface IEnvironments {
  MODE: "local" | "dev" | "prod";
  API_PORT: `${number}`;
  SYSTEM_PASSWORD: string;

  POSTGRES_HOST: string;
  POSTGRES_PORT: `${number}`;
  POSTGRES_DATABASE: string;
  POSTGRES_SCHEMA: string;
  POSTGRES_USERNAME: string;
  POSTGRES_USERNAME_READONLY: string;
  POSTGRES_PASSWORD: string;
}

interface IMode {
  value?: "local" | "dev" | "prod";
}

const modeWrapper: IMode = {};

const environments = new Singleton(() => {
  const env = dotenv.config();
  dotenvExpand.expand(env);
  return typia.assert<IEnvironments>(process.env);
});