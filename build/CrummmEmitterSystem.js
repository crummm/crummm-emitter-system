"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CrummmEmitterSystemInstance_1 = require("./CrummmEmitterSystemInstance");
class CrummmEmitterSystem {
    static emit(type, ...payloads) {
        this._emitter.emit(type, [...payloads]);
    }
    static emitRequest(type, responseCallback, ...payloads) {
        // emit request and directly pass the response callback
        this.emit(type, responseCallback, ...payloads);
    }
    static on(type, listener, listenOrder) {
        this._emitter.on(type, listener, listenOrder);
    }
    static onOnce(type, listener, listenOrder) {
        this._emitter.onOnce(type, listener, listenOrder);
    }
    static onRequest(type, listener, listenOrder) {
        this.on(type, listener, listenOrder);
    }
    static onRequestOnce(type, listener, listenOrder) {
        this.onOnce(type, listener, listenOrder);
    }
    static off(type, listener) {
        this._emitter.off(type, listener);
    }
    static offAllForType(type) {
        this._emitter.off(type);
    }
    static offAll() {
        this._emitter.offAll();
    }
}
CrummmEmitterSystem._emitter = new CrummmEmitterSystemInstance_1.CrummmEmitterSystemInstance();
exports.CrummmEmitterSystem = CrummmEmitterSystem;
