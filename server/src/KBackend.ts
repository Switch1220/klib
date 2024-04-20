import { INestApplication } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";

import { KConfiguration } from "./KConfiguration";
import { KModule } from "./KModule";

export class KBackend {
  private application_?: INestApplication;

  public async open(): Promise<void> {
    // MOUNT CONTROLLERS
    this.application_ = await NestFactory.create(KModule, { logger: false });

    // DO OPEN
    this.application_.enableCors();
    await this.application_.listen(KConfiguration.API_PORT());
  }

  public async close(): Promise<void> {
    if (this.application_ === undefined) return;

    // DO CLOSE
    await this.application_.close();
    delete this.application_;
  }
}
