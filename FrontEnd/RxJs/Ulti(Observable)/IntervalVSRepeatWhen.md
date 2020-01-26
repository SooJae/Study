실행시간 500ms로 잡고 시간간격을 1000ms로 잡았을 경우
RepeatWhen은 (500ms + 1000ms)로 실행
Interval은 (500ms +500ms)으로 실행한다.


Also note that interval/timer are not good observable factories for polling because they do not "wait" for your async action to finish (you can end up with multiple async calls running over each other). For that I tend to use defer and repeatWhen like this:

defer(() => doAsyncAction())
  .pipe(
    repeatWhen(notifications => notifications.pipe(delay(1234)))
  );

https://stackoverflow.com/questions/35770811/difference-between-interval-and-repeatwhen-for-polling-from-an-observable-in
https://beomseok95.tistory.com/57

https://stackoverflow.com/questions/52018881/why-would-i-use-rxjs-interval-or-timer-polling-instead-of-window-setinterval

interval vs timer
interval(interval, unit) should be equivalent to timer(interval, interval, unit).
