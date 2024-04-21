import { tags } from "typia";

export interface IReserve {
  /**
   * Primary Key.
   */
  id: string & tags.Format<"uuid">;

  startAt: string & tags.Format<"date-time">;
  endAt: string & tags.Format<"date-time">;
}

export namespace IReserve {
  export interface ICreate {
    seatId: string & tags.Format<"uuid">;
  }
}
