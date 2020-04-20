import {AsyncSubject, BehaviorSubject, Subject} from 'rxjs';

const observer = {
    next(val:any){console.log('next', val)},
    error(err:any){console.log('error', err)},
    complete(){console.log('complete!')}
};

const subject = new AsyncSubject();

subject.subscribe(observer);
subject.subscribe(observer);

subject.next('Hello');
subject.next('World');
subject.next('GoodBye');

subject.complete();
