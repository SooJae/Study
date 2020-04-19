"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
class ObservableStore {
    constructor(initialState) {
        this._store = new rxjs_1.BehaviorSubject(initialState);
        this._stateUpdates = new rxjs_1.Subject();
        // accumulate state
        this._stateUpdates.pipe(operators_1.tap(console.log), operators_1.scan((acc, curr) => {
            return { ...acc, ...curr };
        }, initialState)).subscribe(this._store);
        // reduce : brian
        // scan:
        // brian
        // { user: 'joe', isAuthenticated: false }
        // joe
        // { user: 'joe', isAuthenticated: true }
        // this._stateUpdates
        //     .pipe(tap(console.log))
        //     .subscribe(this._store);
        // brian
        // { user: 'joe' }
        // joe
        // { isAuthenticated: true }
    }
    updateState(stateUpdate) {
        this._stateUpdates.next(stateUpdate);
    }
    selectState(stateKey) {
        return this._store.pipe(operators_1.distinctUntilKeyChanged(stateKey), operators_1.pluck(stateKey));
    }
    stateChanges() {
        return this._store.asObservable();
    }
}
exports.ObservableStore = ObservableStore;
