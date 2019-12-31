"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
// 검색어에 따라 stack overflow 검색결과를 브라우저에 띄운다. (stack exchange API 이용)
// 불필요한 요청을 방지하기 위해, 1초동안 검색어에 변화가 없을 경우에만 요청을 보낸다.
// 이전에 보냈던 요청의 응답이 그 이후 요청의 응답보다 늦게 도착할 경우, 이를 무시한다.
// 중복되는 검색어가 연속으로 들어왔을 때 요청을 한 번만 보낸다.
// 요청이 실패할 경우 자동으로 최대 3번까지 요청을 재시도한다.
const abc$ = rxjs_1.from([1, 2, 3, 4, 5]);
abc$.pipe(operators_1.filter((value, index) => value !== ''), operators_1.debounceTime(1000), operators_1.distinctUntilChanged(), operators_1.switchMap((value, index) => {
    return ajax.get(`https://api.stackexchange.com/2.2/search?order=desc&sort=activity&intitle=${value}&site=stackoverflow`)
        .pipe(operators_1.map(r => r.response.items))
        .pipe(operators_1.retry(3));
}))
    .subscribe((value) => {
    setResult(value);
}, (err) => setError('error!'));
// subject로부터 들어오는 notification이 빈 문자열이면 filter 함수를 통해 거른다 ->
// debounceTime 함수를 이용해 1초간 비동기 요청을 미룬다 ->
// switchMap 함수를 통해 일반 string으로 들어오는 stream을 비동기 요청 리턴값의 stream으로 바꾼다. ->
// 3 - 1. map 함수를 이용해 response 객체에서 원하는 item 객체만 가져온다.
// 3 - 2. 요청이 실패할 경우, retry함수를 이용해 최대 3번까지 재시도한다.
// 이를 구독하여 컴포넌트 내의 state를 바꾼다.
