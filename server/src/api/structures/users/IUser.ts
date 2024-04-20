import { tags } from "typia";

export interface IUser {
  id: string & tags.Format<"uuid">;

  username: string;
  name: string;

  created_at: string & tags.Format<"date-time">;
}

export namespace IUser {
  export interface ICreate {
    username: string;
    password: string;

    name: string;
  }
}
