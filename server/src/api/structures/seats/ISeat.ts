import { tags } from "typia";

export interface ISeat {
  id: string & tags.Format<"uuid">;

  coordinateX?: number & tags.Type<"float">;
  coordinateY?: number & tags.Type<"float">;
}

export namespace ISeat {
  // export interface IRequest {
  //   search?: IRequest.ISearch,
  //   sort?:
  // }
  // export namespace IRequest {
  //   export interface ISearch {
  //     id: string & tags.Format<"uuid">;
  //   }

  //   export type SortableColumns =
  //        | "id"
  //        | "coordinate_x"
  //        | "coordinate_y"

  // }

  export interface ICreate {
    coordinateX: number & tags.Type<"float">;
    coordinateY: number & tags.Type<"float">;
  }
}
