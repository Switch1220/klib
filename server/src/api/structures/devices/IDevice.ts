import { tags } from "typia";

export interface IDevice {
  deviceId: string & tags.Format<"uuid">;
}

export namespace IDevice {}
