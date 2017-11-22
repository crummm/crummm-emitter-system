"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CrummmEmitterSystemInstance {
    constructor() {
        this._listenersByTypeGroupKV = {};
    }
    /**
     * Adds a listener function to the specified event.
     * @param {String} type
     * @param {Function} listener
     * @return {Object} Current instance of MicroEmitter for chaining.
     */
    on(type, listener, listenOrder) {
        return this._addListener(type, listener, false, listenOrder);
    }
    /**
     * Adds a listener function to the specified event and remove it immediately after it's triggered for the first time.
     * @param {string} type
     * @param listener
     * @returns {EmitterSystemInstance}
     */
    onOnce(type, listener, listenOrder) {
        return this._addListener(type, listener, true, listenOrder);
    }
    /**
     * Removes a listener function to the specified event.
     * @param {String} type
     * @param {Function} listener
     * @return {Object} Current instance of MicroEmitter for chaining.
     */
    off(type, listener) {
        let listenerTypeGroup = this._listenersByTypeGroupKV[type];
        // if no listeners added by this type
        if (!listenerTypeGroup || listenerTypeGroup.listenersDataOL.length === 0) {
            return this;
        }
        // if no listener is defined
        if (!listener) {
            // remove *all* listeners of this type
            delete this._listenersByTypeGroupKV[type];
        }
        else {
            let listenersDataOL = listenerTypeGroup.listenersDataOL;
            let listenerData;
            for (var i = 0; i < listenersDataOL.length; i++) {
                listenerData = listenersDataOL[i];
                if (listenerData.listener === listener) {
                    listenersDataOL.splice(i, 1);
                    i--;
                }
            }
        }
        return this;
    }
    offAll() {
        // loop over all types
        for (let type in this._listenersByTypeGroupKV) {
            this.off(type);
        }
        return this;
    }
    /**
     * Emits an specified event.
     * @param {String} type
     * @param {Object} payload
     * @return {Object} Current instance of MicroEmitter for chaining.
     */
    emit(type, payload) {
        // if no listeners added by this type
        if (!this._listenersByTypeGroupKV[type]) {
            return this;
        }
        // set to valid value
        payload = payload ? payload : [];
        // wrap in array if needed
        payload = Array.isArray(payload) ? payload : [payload];
        let listenersDataOL = this._listenersByTypeGroupKV[type].listenersDataOL;
        let listenerData;
        for (var i = 0; i < listenersDataOL.length; i++) {
            listenerData = listenersDataOL[i];
            // call listener
            listenerData.listener.apply(this, payload);
            // if set to listen to just one emit
            if (listenerData.once === true) {
                // remove listener immediately
                // note: don't directly call 'off' method to offload this because there's no way of knowing that it will remove the right reference if the same listener function is used multiple times plus 'off' could remove more than 1 listener (ouch)
                listenersDataOL.splice(i, 1);
                i--;
            }
        }
        return this;
    }
    /**
     * Adds a listener function to the specified event.
     * @param {String} type
     * @param {Function} listener
     * @param {Boolean} once
     */
    _addListener(type, listener, once, listenOrder) {
        let listenerTypeGroup = this._listenersByTypeGroupKV[type] = this._listenersByTypeGroupKV[type] || new EmitterSystemInstanceListenerTypeGroup();
        listenerTypeGroup.addListener(listener, once, listenOrder);
        return this;
    }
}
exports.CrummmEmitterSystemInstance = CrummmEmitterSystemInstance;
class EmitterSystemInstanceListenerTypeGroup {
    constructor() {
        this.listenersDataOL = [];
    }
    addListener(listener, once, listenOrder) {
        let newListenerData = new EmitterSystemInstanceListenerData(listener, once, listenOrder);
        // if listen order is defined and this is NOT the first item (so there isn't any other items to compare to)
        if (!!listenOrder && this.listenersDataOL.length > 0) {
            let compareToListenerData;
            // to sort based on listenOrder, loop over any existing listeners
            for (var i = 0; i < this.listenersDataOL.length; i++) {
                compareToListenerData = this.listenersDataOL[i];
                // if this listener should be called before the listener it's being compared to
                // if the compared listen order is undefined OR the number is greater
                if (!!compareToListenerData.listenOrder === false || listenOrder < compareToListenerData.listenOrder) {
                    // insert this listener before the existing listener (first in, first out if same order)
                    this.listenersDataOL.splice(i, 0, newListenerData);
                    // because the integrity of listenOrder order is constantly being maintained in this array, we can break here and be assured no other listeners have a greater listenOrder
                    break;
                }
                else if (listenOrder === compareToListenerData.listenOrder) {
                    // insert this listener after the existing listener (first in, first out if same order)
                    this.listenersDataOL.splice(i + 1, 0, newListenerData);
                    // because the integrity of listenOrder order is constantly being maintained in this array, we can break here and be assured no other listeners have a greater listenOrder
                    break;
                }
            }
        }
        else {
            // insert at end of array
            this.listenersDataOL[this.listenersDataOL.length] = newListenerData;
        }
    }
}
class EmitterSystemInstanceListenerData {
    constructor(listener, once, listenOrder) {
        this.listener = listener;
        this.once = once;
        this.listenOrder = listenOrder;
    }
}
