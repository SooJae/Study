/**
 *   combineLatest
 */
import {Observable} from 'rxjs';

let boys = Observable.from(["tom","jhon","jack"])

let girls = Observable.from(["annie","amanda","jane"])

Observable.combineLatest(boys, girls, resultSelector: { (boy:String,girl:String) in

    return (boy,girl)

}).subscribe{ event in

print(event)

}.disposed(by: disposeBag)
