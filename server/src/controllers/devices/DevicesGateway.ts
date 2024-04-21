import { OnApplicationShutdown } from "@nestjs/common";
import {
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
} from "@nestjs/websockets";
import { Subscription } from "rxjs";
import { Server } from "socket.io";

import { WebSocketProvider } from "../../providers/common/WebSocketProvider";

@WebSocketGateway({
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
})
export class DevicesGateway
  implements OnGatewayInit, OnApplicationShutdown, OnGatewayDisconnect
{
  private subscription: Subscription | undefined;

  afterInit(server: Server): void {
    this.subscription = WebSocketProvider.getEventSubject$().subscribe({
      next: (event) => server.emit(event.name, event.data),
      error: (err) => server.emit("exception", err.toString()),
    });
  }

  onApplicationShutdown() {
    this.subscription?.unsubscribe();
  }

  handleDisconnect(server: Server) {
    server.emit("closed");
  }
}
