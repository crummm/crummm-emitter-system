import 'reflect-metadata';
import { CrummmEmitterSystem } from "./CrummmEmitterSystem";

beforeEach(() => {
  CrummmEmitterSystem.offAll();
});

/**
 * Group the unit tests
 */
describe(
  'EmitterSystem Tests',
  () => {
    //
    // SIMPLE / BASIC USE CASES
    //

    test(
      "simple - 'on' followed by an 'emit' of a matching 'type' params should trigger 1 callback",
      () => {
        const TYPE: string = "type";
        const PAYLOAD: string = "payload";
        const callback = jest.fn();

        CrummmEmitterSystem.on(TYPE, callback);
        CrummmEmitterSystem.emit(TYPE, PAYLOAD);

        expect(callback.mock.calls[0][0]).toBe(PAYLOAD); // test the first argument [0][0] of the first call [0]
      }
    );

    test(
      "simple - 'on' followed by an 'emit' of a different 'type' params should trigger 0 callbacks",
      () => {
        const TYPE1: string = "type 1";
        const TYPE2: string = "type 2";
        const PAYLOAD: string = "payload";
        const callback = jest.fn();

        CrummmEmitterSystem.on(TYPE1, callback);
        CrummmEmitterSystem.emit(TYPE2, PAYLOAD);

        expect(callback.mock.calls.length).toBe(0);
      }
    );

    test(
      "simple - 'on' followed by 2 'emit' calls should trigger 2 callbacks",
      () => {
        const TYPE: string = "type";
        const callback = jest.fn();

        CrummmEmitterSystem.on(TYPE, callback);
        CrummmEmitterSystem.emit(TYPE);
        CrummmEmitterSystem.emit(TYPE);

        expect(callback.mock.calls.length).toBe(2);
      }
    );

    test(
      "simple - 'onOnce' followed by 2 'emit' calls should trigger only 1 callback",
      () => {
        const TYPE: string = "type";
        const callback = jest.fn();

        CrummmEmitterSystem.onOnce(TYPE, callback);
        CrummmEmitterSystem.emit(TYPE);
        CrummmEmitterSystem.emit(TYPE);

        expect(callback.mock.calls.length).toBe(1);
      }
    );

    test(
      "simple - 'off' should remove a matching 'on' and trigger 0 callbacks",
      () => {
        const TYPE: string = "type";
        const callback = jest.fn();

        CrummmEmitterSystem.on(TYPE, callback);
        CrummmEmitterSystem.off(TYPE, callback);
        CrummmEmitterSystem.emit(TYPE);

        expect(callback.mock.calls.length).toBe(0);
      }
    );

    test(
      "simple - 'off' should remove a matching 'onOnce' and trigger 0 callbacks",
      () => {
        const TYPE: string = "type";
        const callback = jest.fn();

        CrummmEmitterSystem.onOnce(TYPE, callback);
        CrummmEmitterSystem.off(TYPE, callback);
        CrummmEmitterSystem.emit(TYPE);

        expect(callback.mock.calls.length).toBe(0);
      }
    );

    //
    // INTERMEDIATE / NOVICE
    //

    test(
      "intermediate - 2 'on' using the same callback should trigger 2 callbacks",
      () => {
        const TYPE: string = "type";
        const callback = jest.fn();

        CrummmEmitterSystem.on(TYPE, callback);
        CrummmEmitterSystem.on(TYPE, callback);
        CrummmEmitterSystem.emit(TYPE);

        expect(callback.mock.calls.length).toBe(2);
      }
    );

    test(
      "intermediate - 2 'on' using the same callback followed by 1 'off' should trigger 0 callbacks",
      () => {
        const TYPE: string = "type";
        const callback = jest.fn();

        CrummmEmitterSystem.on(TYPE, callback);
        CrummmEmitterSystem.on(TYPE, callback);
        CrummmEmitterSystem.off(TYPE, callback);
        CrummmEmitterSystem.emit(TYPE);

        expect(callback.mock.calls.length).toBe(0);
      }
    );

    test(
      "intermediate - multiple payloads should be passed to the triggered callback",
      () => {
        const TYPE: string = "type";
        const PAYLOAD1: string = "payload 1";
        const PAYLOAD2: string = "payload 2";
        const callback = jest.fn();

        CrummmEmitterSystem.on(TYPE, callback);
        CrummmEmitterSystem.emit(TYPE, PAYLOAD1, PAYLOAD2);

        expect(callback.mock.calls[0][0]).toBe(PAYLOAD1); // test the first argument [0][0] of the first call [0]
        expect(callback.mock.calls[0][1]).toBe(PAYLOAD2); // test the second argument [0][1] of the first call [0]
      }
    );

    test(
      "intermediate - 2 'on' with payloads and 1 'emit' with a matching 'type' should trigger 2 callbacks with payloads",
      () => {
        const TYPE: string = "type";
        const PAYLOAD: string = "payload";
        const callback1 = jest.fn();
        const callback2 = jest.fn();

        CrummmEmitterSystem.on(TYPE, callback1);
        CrummmEmitterSystem.on(TYPE, callback2);
        CrummmEmitterSystem.emit(TYPE, PAYLOAD);

        expect(callback1.mock.calls[0][0]).toBe(PAYLOAD); // test the first argument [0][0] of the first call [0]
        expect(callback2.mock.calls[0][0]).toBe(PAYLOAD); // test the first argument [0][0] of the first call [0]
      }
    );

    test(
      "intermediate - 'on' followed by 'emit' followed by another 'on' should only trigger 1 callback",
      () => {
        const TYPE: string = "type";
        const callback1 = jest.fn();
        const callback2 = jest.fn();

        CrummmEmitterSystem.on(TYPE, callback1);
        CrummmEmitterSystem.emit(TYPE);
        CrummmEmitterSystem.on(TYPE, callback2);

        expect(callback1.mock.calls.length).toBe(1);
        expect(callback2.mock.calls.length).toBe(0);
      }
    );

    test(
      "intermediate - 2 'on' with different 'type' params and 1 'emit' matching only 1 of them should only trigger 1 callback",
      () => {
        const TYPE1: string = "type 1";
        const TYPE2: string = "type 2";
        const callback1 = jest.fn();
        const callback2 = jest.fn();

        CrummmEmitterSystem.on(TYPE1, callback1);
        CrummmEmitterSystem.on(TYPE2, callback2);
        CrummmEmitterSystem.emit(TYPE1);

        expect(callback1.mock.calls.length).toBe(1);
        expect(callback2.mock.calls.length).toBe(0);
      }
    );

    test(
      "intermediate - an 'off' shouldn't remove 2 different 'on' callbacks",
      () => {
        const TYPE: string = "type";
        const callback1 = jest.fn();
        const callback2 = jest.fn();

        CrummmEmitterSystem.on(TYPE, callback1);
        CrummmEmitterSystem.on(TYPE, callback2);
        CrummmEmitterSystem.off(TYPE, callback1);
        CrummmEmitterSystem.emit(TYPE);

        expect(callback1.mock.calls.length).toBe(0);
        expect(callback2.mock.calls.length).toBe(1);
      }
    );

    test(
      "intermediate - any number of 'on' followed by 'offAllForType' should trigger 0 callbacks",
      () => {
        const TYPE: string = "type";
        const callback1 = jest.fn();
        const callback2 = jest.fn();
        const callback3 = jest.fn();

        CrummmEmitterSystem.on(TYPE, callback1);
        CrummmEmitterSystem.on(TYPE, callback2);
        CrummmEmitterSystem.on(TYPE, callback3);
        CrummmEmitterSystem.offAllForType(TYPE);
        CrummmEmitterSystem.emit(TYPE);

        expect(callback1.mock.calls.length).toBe(0);
        expect(callback2.mock.calls.length).toBe(0);
        expect(callback3.mock.calls.length).toBe(0);
      }
    );

    test(
      "intermediate - all 'on' followed by 'offAll' should trigger 0 callbacks",
      () => {
        const TYPE1: string = "type 1";
        const TYPE2: string = "type 2";
        const callback1 = jest.fn();
        const callback2 = jest.fn();

        CrummmEmitterSystem.on(TYPE1, callback1);
        CrummmEmitterSystem.on(TYPE2, callback2);
        CrummmEmitterSystem.offAll();
        CrummmEmitterSystem.emit(TYPE1);
        CrummmEmitterSystem.emit(TYPE2);

        expect(callback1.mock.calls.length).toBe(0);
        expect(callback2.mock.calls.length).toBe(0);
      }
    );

    test(
      "intermediate - 'onRequest' and 'emitRequest' trigger final response callback with expected payload",
      () => {
        const TYPE: string = "type";
        const PAYLOAD: string = "payload";

        CrummmEmitterSystem.onRequest(
          TYPE,
          (responseCallback: Function, requestValue: any)=> {
            responseCallback(requestValue);
          }
        );

        CrummmEmitterSystem.emitRequest(
          TYPE,
          (responseValue: string)=> {
            expect(responseValue).toBe(PAYLOAD);
          },
          PAYLOAD
        );

        expect.hasAssertions(); // verifies that at least one assertion is called during a test
      }
    );

    //
    // COMPLEX / ADVANCED
    //

    test(
      "intermediate - 'listenOrder' param used to force listens to trigger in a specific order regardless of the order they were defined",
      () => {
        const TYPE: string = "type";
        const resultsOL: number[] = [];

        CrummmEmitterSystem.onOnce(
          TYPE,
          () => {
            //console.log("This should fire 3rd even though it's setup 1st: ", payload.message);
            resultsOL.push(1);
          },
          104
        );

        CrummmEmitterSystem.onOnce(
          TYPE,
          () => {
            //console.log("This should fire 1st even though it's setup 2nd: ", payload.message);
            resultsOL.push(2);
          },
          102
        );

        CrummmEmitterSystem.onOnce(
          TYPE,
          () => {
            //console.log("This should fire 2nd even though it's setup 3rd: ", payload.message);
            resultsOL.push(3);
          },
          103
        );

        CrummmEmitterSystem.emit(TYPE);

        expect(resultsOL).not.toEqual([1, 2, 3]);
        expect(resultsOL).toEqual([2, 3, 1]);
      }
    );
  }
);
