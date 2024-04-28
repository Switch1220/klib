import core from "@nestia/core";
import { Controller } from "@nestjs/common";

import { IDevice } from "@kliber-api/lib/structures/devices/IDevice";

import { DevicesProvider } from "../../providers/devices/DevicesProvider";

@Controller("devices")
export class DevicesController {
  /**
   * Grant device a id when connecting first time
   *
   * @author Switch
   */
  @core.TypedRoute.Post("register")
  public async register(): Promise<IDevice> {
    return DevicesProvider.register();
  }

  /**
   * Create seat reservation
   *
   * @author Switch
   */
  // @core.TypedRoute.Post()
  // public async create(@core.TypedBody() input: I): Promise<ISeat> {
  //   return SeatsProvider.create(input);
  // }
}
