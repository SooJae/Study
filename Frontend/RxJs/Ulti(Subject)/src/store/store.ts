import {BehaviorSubject, Subject} from 'rxjs';
import {distinctUntilKeyChanged, pluck, reduce, scan, tap} from 'rxjs/operators';


export class ObservableStore{
    private _store: BehaviorSubject<any>;
    private _stateUpdates: Subject<unknown>;
    
    constructor(initialState: any) {
        this._store = new BehaviorSubject(
            initialState
        );
        this._stateUpdates = new Subject();

        // accumulate state
        this._stateUpdates.pipe(
            tap(console.log),
            scan((acc, curr) => {
                return {...acc, ...curr};
            }, initialState),

        ).subscribe(this._store);


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

    updateState(stateUpdate: any){
        this._stateUpdates.next(stateUpdate);
    }

    selectState(stateKey: any){
        return this._store.pipe(
            distinctUntilKeyChanged(stateKey),
            pluck(stateKey)
        );
    }

    stateChanges() {
        return this._store.asObservable();
    }
}
