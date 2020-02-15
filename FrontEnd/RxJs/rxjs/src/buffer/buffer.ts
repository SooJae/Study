import {timer} from 'rxjs';
import {buffer} from 'rxjs/operators';

timer(0,50)
    .pipe(
        buffer(timer(500))
    )
.subscribe(console.log);
