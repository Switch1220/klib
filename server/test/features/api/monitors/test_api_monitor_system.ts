import api from "@kliber-api";
import { ISystem } from "@kliber-api/lib/structures/monitors/ISystem";
import { assert } from "typia";

export async function test_api_monitor_system(
  connection: api.IConnection,
): Promise<void> {
  const system: ISystem = await api.functional.monitors.system.get(connection);
  assert<typeof system>(system);
}
