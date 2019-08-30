import { IPCRenderer } from "../ipc";

declare global {
  interface Window {
    renderer: IPCRenderer;
  }
}
