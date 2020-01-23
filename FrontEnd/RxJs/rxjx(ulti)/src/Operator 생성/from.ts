import {range,of , from} from 'rxjs'


function* hello() {
    yield 'Hello';
    yield 'world';
}

const observer = {
    next(val:any){console.log('next', val)},
    error(err:any){console.log('error', err)},
    complete(){console.log('complete!')}
}

const source$ = from(hello());
source$.subscribe(observer);

