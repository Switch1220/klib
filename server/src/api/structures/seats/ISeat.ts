import { tags } from "typia";

export interface ISeat {
  id: string & tags.Format<"uuid">;
}

export namespace ISeat {}
