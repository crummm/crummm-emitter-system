"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CrummmEmitterSystemInstance_1 = require("./CrummmEmitterSystemInstance");
const CrummmEmitterSystem_1 = require("./CrummmEmitterSystem");
class CrummmEmitterSystemExamples {
    constructor() { }
    instanceExampleWithEmitAndOn() {
        const TYPE = "TYPE";
        const emitter = new CrummmEmitterSystemInstance_1.CrummmEmitterSystemInstance();
        emitter.on(TYPE, (payload) => {
            console.log("This should fire both times: ", payload.message);
        });
        setTimeout(() => {
            emitter.emit(TYPE, { message: "Hello World 1!" });
            emitter.emit(TYPE, { message: "Hello World 2!" });
        }, 1000);
        // EXPECTED RESULT LOG
        // This should fire both times:  Hello World 1!
        // This should fire both times:  Hello World 2!
    }
    instanceExampleWithEmitAndOnOnce() {
        const TYPE = "TYPE";
        const emitter = new CrummmEmitterSystemInstance_1.CrummmEmitterSystemInstance();
        emitter.onOnce(TYPE, (payload) => {
            console.log("This should fire once: ", payload.message);
        });
        setTimeout(() => {
            emitter.emit(TYPE, { message: "Hello World 1!" });
            emitter.emit(TYPE, { message: "Hello World 2!" });
        }, 1000);
        // EXPECTED RESULT LOG
        // This should fire once:  Hello World 1!
    }
    instanceExampleWithListenOrder() {
        const TYPE = "TYPE";
        const emitter = new CrummmEmitterSystemInstance_1.CrummmEmitterSystemInstance();
        emitter.onOnce(TYPE, (payload) => {
            console.log("This should fire 3rd even though it's setup 1st: ", payload.message);
        }, 5);
        emitter.onOnce(TYPE, (payload) => {
            console.log("This should fire 1st even though it's setup 2nd: ", payload.message);
        }, 1);
        emitter.onOnce(TYPE, (payload) => {
            console.log("This should fire 2nd even though it's setup 3rd: ", payload.message);
        }, 2);
        setTimeout(() => {
            emitter.emit(TYPE, { message: "Hello listenOrder!" });
        }, 1000);
        // EXPECTED RESULT LOG
        // This should fire 1st even though it's setup 2nd:  Hello listenOrder!
        // This should fire 2nd even though it's setup 3rd:  Hello listenOrder!
        // This should fire 3rd even though it's setup 1st:  Hello listenOrder!
    }
    systemExampleWithRequestAndResponse() {
        // listen for requests
        CrummmEmitterSystem_1.CrummmEmitterSystem.onRequest("helloRequest", (responseCallback, requestValue) => {
            responseCallback("Hello " + requestValue + "!");
        });
        // make request for data
        CrummmEmitterSystem_1.CrummmEmitterSystem.emitRequest("helloRequest", (response) => {
            console.log(response);
        }, "Billy");
        // EXPECTED RESULT LOG
        // Hello Billy!
    }
}
exports.CrummmEmitterSystemExamples = CrummmEmitterSystemExamples;
