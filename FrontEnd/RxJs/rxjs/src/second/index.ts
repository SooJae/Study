import {Observable} from 'rxjs';

const btnClickStream =
    Observable
        .fromEvent(addLocationBtn, 'click')
        .map(() => true)
        .forEach(val => console.log('btnClickStream val', val));
