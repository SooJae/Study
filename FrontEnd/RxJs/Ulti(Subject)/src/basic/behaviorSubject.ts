import {BehaviorSubject, Subject} from 'rxjs';

const observer = {
    next(val:any){console.log('next', val)},
    error(err:any){console.log('error', err)},
    complete(){console.log('complete!')}
};

const subject = new BehaviorSubject('Hello');

const subscription = subject.subscribe(
    observer
);

subject.next('Hello');

const secondSubscription = subject.subscribe(
    observer
);

subject.next('World');

setTimeout(() => {
    subject.subscribe(
        observer
    )
}, 3000);
