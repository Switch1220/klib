import { Observable, Subject } from "rxjs";

export interface WebsocketEvent {
  deviceId: string;
  name: string;
  data: unknown;
}

export class WebSocketProvider {
  static subject = new Subject<WebsocketEvent>();

  static addEvent(
    deviceId: string,
    eventName: string,
    eventData: unknown,
  ): void {
    WebSocketProvider.subject.next({
      deviceId: deviceId,
      name: eventName,
      data: eventData,
    });
  }

  static getEventSubject$(): Observable<WebsocketEvent> {
    return WebSocketProvider.subject.asObservable();
  }
}
