import { IPerformance } from "@kliber-api/lib/structures/monitors/IPerformance";
import core from "@nestia/core";
import { Controller } from "@nestjs/common";

@Controller("monitors/performance")
export class MonitorPerformanceController {
  /**
   * Get performance information.
   *
   * Get perofmration information composed with CPU, memory and resource usage.
   *
   * @returns Performance info
   * @tag Monitor
   *
   * @author Samchon
   */
  @core.TypedRoute.Get()
  public async get(): Promise<IPerformance> {
    return {
      cpu: process.cpuUsage(),
      memory: process.memoryUsage(),
      resource: process.resourceUsage(),
    };
  }
}
