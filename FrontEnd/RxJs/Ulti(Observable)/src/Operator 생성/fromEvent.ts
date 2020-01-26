import {fromEvent} from 'rxjs';

const observer = {
    next(val:any){console.log('next', val)},
    error(err:any){console.log('error', err)},
    complete(){console.log('complete!')}
}

const source$ = fromEvent(document, 'click');

const subOne = source$.subscribe(observer);
const subTwo = source$.subscribe(observer);

setTimeout(()=>{
    console.log('unsubscribing');
    subOne.unsubscribe();
}, 3000);
