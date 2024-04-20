import { tags } from "typia";

export interface IReserve {
  /**
   * Primary Key.
   */
  id: string & tags.Format<"uuid">;

  // seat_id: string & tags.Format<"uuid">;
  // user_id: string & tags.Format<"uuid">;

  start_at: string & tags.Format<"date-time">;
  end_at: string & tags.Format<"date-time">;
}

export namespace IReserve {
  export interface ICreate {
    seat_id: string & tags.Format<"uuid">;
    user_id: string & tags.Format<"uuid">;
  }
}
