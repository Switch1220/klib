import core from "@nestia/core";
import { Controller } from "@nestjs/common";

import { ISeat } from "@kliber-api/lib/structures/seats/ISeat";

import { SeatsProvider } from "../../providers/seats/SeatsProvider";

@Controller("seats")
export class SeatsController {
  /**
   * List up all seats
   *
   * @author Switch
   */
  @core.TypedRoute.Get()
  public async index(): Promise<ISeat[]> {
    return SeatsProvider.index();
  }

  /**
   * Create seat reservation
   *
   * @author Switch
   */
  @core.TypedRoute.Post()
  public async create(@core.TypedBody() input: ISeat.ICreate): Promise<ISeat> {
    return SeatsProvider.create(input);
  }
}
