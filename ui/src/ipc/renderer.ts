import { IMessage } from "./message";

declare var external;

type RendererCallback = (event: string, value: any) => void;

export class IPCRenderer {
  constructor(private eventTable: { [key: string]: RendererCallback } = {}) {}

  public send(message: IMessage) {
    external.invoke(JSON.stringify(message));
  }

  public on(event: string, callback: RendererCallback) {
    this.eventTable[event] = callback;
  }

  public trigger(event: string, value: string) {
    const cb = this.eventTable[event];
    if (cb !== undefined) {
      cb(event, JSON.parse(value));
    } else {
      console.log("No event handler");
    }
  }
}
