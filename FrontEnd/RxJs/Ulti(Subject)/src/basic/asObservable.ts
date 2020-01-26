import {Observable, Subject} from 'rxjs';

 const myObservable = new Subject<any>();
 const myObservable$ = myObservable.asObservable();

(myObservable$ as any).next();
