import { CrummmEmitterSystemInstance } from "./CrummmEmitterSystemInstance";

export class CrummmEmitterSystem {
  protected static _emitter: CrummmEmitterSystemInstance = new CrummmEmitterSystemInstance();

  public static emit(type: string, ...payloads) {
    this._emitter.emit(type, [... payloads]);
  }

  public static emitRequest(type: string, responseCallback: Function, ...payloads) {
    // emit request and directly pass the response callback
    this.emit(type, responseCallback, ... payloads);
  }

  public static on(type: string, listener: Function, listenOrder?: number) {
    this._emitter.on(type, listener, listenOrder);
  }

  public static onOnce(type: string, listener: Function, listenOrder?: number) {
    this._emitter.onOnce(type, listener, listenOrder);
  }

  public static onRequest(type: string, listener: Function, listenOrder?: number) {
    this.on(type, listener, listenOrder);
  }

  public static onRequestOnce(type: string, listener: Function, listenOrder?: number) {
    this.onOnce(type, listener, listenOrder);
  }

  public static off(type: string, listener: Function) {
    this._emitter.off(type, listener);
  }

  public static offAllForType(type: string) {
    this._emitter.off(type);
  }

  public static offAll() {
    this._emitter.offAll();
  }
}
