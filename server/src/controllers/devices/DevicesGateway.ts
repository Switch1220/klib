import { OnApplicationShutdown } from "@nestjs/common";
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
} from "@nestjs/websockets";
import { Subscription } from "rxjs";
import { Server, Socket } from "socket.io";

import { KGlobal } from "../../KGlobal";
import { WebSocketProvider } from "../../providers/common/WebSocketProvider";

@WebSocketGateway({
  cors: {
    origin: "*",
  },
})
export class DevicesGateway implements OnGatewayInit, OnApplicationShutdown {
  private subscription: Subscription | undefined;

  afterInit(server: Server): void {
    this.subscription = WebSocketProvider.getEventSubject$().subscribe({
      next: (event) => server.to(event.deviceId).emit(event.name, event.data),
      error: (err) => server.emit("exception", err.toString()),
    });
  }

  // handleConnection(client: Socket) {
  // }

  // handleDisconnect(client: Socket) {
  //   client.emit("closed");
  // }

  @SubscribeMessage("join-request")
  async handleEvent(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: string,
  ): Promise<void> {
    const record = await KGlobal.prisma.seat_node.findFirst({
      where: {
        device_id: data,
      },
    });

    if (record === null) {
      return;
    }

    await client.join(data);
  }

  onApplicationShutdown() {
    this.subscription?.unsubscribe();
  }
}
