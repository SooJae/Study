import {BehaviorSubject, ReplaySubject, Subject} from 'rxjs';

const observer = {
    next(val:any){console.log('next', val)},
    error(err:any){console.log('error', err)},
    complete(){console.log('complete!')}
};

const subject = new ReplaySubject(2);
subject.next('hello');
subject.next('world');
subject.next('goodbye');
subject.subscribe(observer);
