import {range} from 'rxjs'


function hello() {
    return 'hello world';
}

const observer = {
    next(val:any){console.log('next', val)},
    error(err:any){console.log('error', err)},
    complete(){console.log('complete!')}
}

const source$ = range(0.1,5);
source$.subscribe(observer);
console.log(hello());
