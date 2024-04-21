import { Observable, Subject } from "rxjs";

export interface WebsocketEvent {
  name: string;
  data: unknown;
}

export class WebSocketProvider {
  static subject = new Subject<WebsocketEvent>();

  static addEvent(eventName: string, eventData: unknown): void {
    WebSocketProvider.subject.next({ name: eventName, data: eventData });
  }

  static getEventSubject$(): Observable<WebsocketEvent> {
    return WebSocketProvider.subject.asObservable();
  }
}
