```js
const source = Rx.Observable.from([
  {name: 'Joe', age: 30, job: {title: 'Developer', language: 'JavaScript'}},
  //will return undefined when no job is found
  {name: 'Sarah', age:35}
]);
//grab title property under job
const example = source.map(value => value.job.language); 
//output: "Developer" , undefined
const subscribe = example.subscribe(val => console.log(val));
```
```bash
JavaScript
Rx.umd.js:529 Uncaught TypeError: Cannot read property 'language' of undefined
    at MapSubscriber.project ((index):39)
    at MapSubscriber._next (Rx.umd.js:9610)
    at MapSubscriber.Subscriber.next (Rx.umd.js:1259)
    at MapSubscriber._next (Rx.umd.js:9616)
    at MapSubscriber.Subscriber.next (Rx.umd.js:1259)
    at ArrayObservable._subscribe (Rx.umd.js:2520)
    at ArrayObservable.Observable.subscribe (Rx.umd.js:524)
    at Observable._subscribe (Rx.umd.js:582)
    at MapOperator.call (Rx.umd.js:9588)
    at Observable.subscribe (Rx.umd.js:521)
```


```js
const source = Rx.Observable.from([
  {name: 'Joe', age: 30, job: {title: 'Developer', language: 'JavaScript'}},
  //will return undefined when no job is found
  {name: 'Sarah', age:35}
]);
//grab title property under job
const example = source.pluck('job','language')
//output: "Developer" , undefined
const subscribe = example.subscribe(val => console.log(val));
```

```bash
JavaScript
undefined
```


Pluck : Like map, but meant only for picking one of the nested properties of every emitted object.

Therefore, let's say you have

[{ name: 'Joe', age: 30, job: { title: 'Developer', language: 'JavaScript' },
{ name: 'Sarah', age: 35 }]
and you want a list of all job titles.

Using map would be kind of a pain (because of the nullability of job), but with 'pluck' you can write pluck('job', 'title') and it will traverse the tree looking for job.title - and won't fail if job is null.