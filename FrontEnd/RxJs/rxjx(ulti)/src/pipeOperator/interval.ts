import {interval, timer} from  'rxjs'

const timer$ = timer(1000);

timer$.subscribe(console.log);
