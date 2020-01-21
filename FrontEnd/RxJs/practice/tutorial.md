http://reactivex.io/tutorials.html
http://reactivex.io/learnrx/


# concatAll()
이중 배열일경우 2번째 배열을 꺼내서 하나로 변환한다.
```js
function() {
	var movieLists = [
			{
				name: "New Releases",
				videos: [
					{
						"id": 70111470,
						"title": "Die Hard",
						"boxart": "http://cdn-0.nflximg.com/images/2891/DieHard.jpg",
						"uri": "http://api.netflix.com/catalog/titles/movies/70111470",
						"rating": 4.0,
						"bookmark": []
					},
					{
						"id": 654356453,
						"title": "Bad Boys",
						"boxart": "http://cdn-0.nflximg.com/images/2891/BadBoys.jpg",
						"uri": "http://api.netflix.com/catalog/titles/movies/70111470",
						"rating": 5.0,
						"bookmark": [{ id: 432534, time: 65876586 }]
					}
				]
			},
			{
				name: "Dramas",
				videos: [
					{
						"id": 65432445,
						"title": "The Chamber",
						"boxart": "http://cdn-0.nflximg.com/images/2891/TheChamber.jpg",
						"uri": "http://api.netflix.com/catalog/titles/movies/70111470",
						"rating": 4.0,
						"bookmark": []
					},
					{
						"id": 675465,
						"title": "Fracture",
						"boxart": "http://cdn-0.nflximg.com/images/2891/Fracture.jpg",
						"uri": "http://api.netflix.com/catalog/titles/movies/70111470",
						"rating": 5.0,
						"bookmark": [{ id: 432534, time: 65876586 }]
					}
				]
			}
		];

	// ------------   INSERT CODE HERE!  -----------------------------------
	// Use map and concatAll to flatten the movieLists in a list of video ids.
	// ------------   INSERT CODE HERE!  -----------------------------------

	return movieLists // Complete this expression!

// Expected [675465, 65432445, 70111470,654356453]
}
```
배열안의 배열을 접근하기 위해서

## forEach 2개 쓰는 방법
```js
 movieLists.forEach(v=> 
    v.videos.forEach(v2 => 
        allVideoIdsInMovieLists.push(v2.id)));
 ```


## map 2개와 concatAll 쓰는 방법
 ```js
return movieLists.map(movieList => movieList.videos.map(video => video.id)).concatAll(); // 
```




## concatMap
concatMap은 `[[[],[]],[[],[]]]` 와 같이 배열이 여러개가 있을때  map과 concatAll을 하나로 묶어서 처리한다. (예시에서는 concatMap을 이용하지 않으면, map과 concatAll을 두번 씩 사용해야 한다.)


```js
Array.prototype.concatAll = function() {
	var results = [];
	this.forEach(function(subArray) {
		results.push.apply(results, subArray);
	});
	
	return results;

	// JSON.stringify([ [1,2,3], [4,5,6], [7,8,9] ].concatAll()) === "[1,2,3,4,5,6,7,8,9]"
	// [1,2,3].concatAll(); // throws an error because this is a one-dimensional array
};

Array.prototype.concatMap = function(projectionFunctionThatReturnsArray) {
	
	return this.
		map(function(item) {
			return projectionFunctionThatReturnsArray(item);
		}).
		// apply the concatAll function to flatten the two-dimensional array
		concatAll();

	/*
		var spanishFrenchEnglishWords = [ ["cero","rien","zero"], ["uno","un","one"], ["dos","deux","two"] ];
		// collect all the words for each number, in every language, in a single, flat list
		var allWords = [0,1,2].
			concatMap(function(index) {
				return spanishFrenchEnglishWords[index];
			});

		return JSON.stringify(allWords) === '["cero","rien","zero","uno","un","one","dos","deux","two"]';
	*/
};
```

# Zip
Zip은 두개의 배열중 Min값에 맞춰서 합성한다.




# Querying Observables
두개의 차이점은 무엇일까요?
1. 영화 목록들부터 평점 5.0인 영화의 flat List을 만든다.
2. 마우스 업, 마우스 무브, 마우스 다운으로 부터의 모든 마우스 드래그 이벤트들의 연속성을 만든다.

사실상 기능적으로는 차이가 없습니다.
배열 순회와 Observable 순회의 차이점 은 데이터가 이동하는 방향입니다. 배열을 순회 할 때 클라이언트 는 데이터 소스에서 데이터를 가져 와서 결과가 나올 때까지 차단합니다. Observable을 탐색 할 때 데이터 소스 는 클라이언트가 도착할 때마다 데이터를 푸시 합니다.

데이터가 이동하는 방향이 해당 데이터를 쿼리하는 방향과 직교 한다는 것이 밝혀졌습니다 . 다시 말해, 데이터를 쿼리 할 때 데이터를 가져 오는지 또는 데이터가 푸시되는지는 중요하지 않습니다. 두 경우 모두 쿼리 메소드는 동일한 변환을 수행합니다. 변경되는 유일한 것은 각각 입력 및 출력 유형입니다. 배열을 필터링하면 새로운 배열이 생깁니다. Observable을 필터링하면 새로운 Observable 등이 나타납니다.

쿼리 메소드가 Observables 및 Arrays를 어떻게 변환하는지 살펴보십시오.

```js
// map()

[1,2,3].map(function(x) { return x + 1 })                       === [2,3,4]
seq([1,,,2,,,3]).map(function(x) { return x + 1})               === seq([2,,,3,,,4])
seq([1,,,2,,,3,,,]).map(function(x) { return x + 1 })           === seq([2,,,3,,,4,,,])

// filter()

[1,2,3].filter(function(x) { return x > 1; })                   === [2,3]
seq([1,,,2,,,3]).filter(function(x) { return x > 1; })          === seq([2,,,3])
seq([1,,,2,,,3,,,]).filter(function(x) { return x > 1; })       === seq([2,,,3,,,])

// concatAll()

[ [1, 2, 3], [4, 5, 6] ].concatAll()                             === [1,2,3,4,5,6]
seq([ seq([1,,,2,,,3]),,,seq([4,,,5,,,6]) ]).concatAll()         === seq([1,,,2,,,3,,,4,,,5,,,6])

// If a new sequence arrives before all the items
// from the previous sequence have arrived, no attempt
// to retrieve the new sequence's elements is made until
// the previous sequence has completed. As a result the
// order of elements in the sequence is preserved.
seq([
	seq([1,,,, ,2, ,3])
	,,,seq([,,4, ,5, ,,6]) ]).
	concatAll()                                                  === seq([1,,,,,2,,3,,4,,5,,,6])

// Notice that as long as at least one sequence being
// concatenated is incomplete, the concatenated sequence is also
// incomplete.
seq([
	seq([1,, ,,, ,,,2,,,3])
	,,,seq([4,,,5,,, ,,, ,,6,,,]) ]).
	concatAll()                                                  === seq([1,,,,,,,,2,,,3,4,,,5,,,,,,,,6,,,])

// reduce()

[ 1, 2, 3 ].reduce(sumFunction)                                 === [ 6 ]
seq([ 1,,,2,,,3 ]).reduce(sumFunction)                          === seq([,,,,,,6])

// Reduced sequences do not complete until the
// sequence does.
seq([ 1,,,2,,,3,,, ]).reduce(sumFunction)                       === seq([ ,,,,,,,,,])

// zip()

// In both Arrays and Observables, the zipped sequence
// completes as soon as either the left or right-hand
// side sequence completes.
Array.zip([1,2],[3,4,5], sumFunction)                           === [4,6]
Observable.zip(seq([1,,,2]),seq([3,,,4,,,5]), sumFunction)      === seq([4,,,6])

// take()
[1,2,3].take(2)                                                 === [1, 2]
seq([ 1,,,2,,,3 ]).take(2)                                      === seq([ 1,,,2 ])
seq([ 1,,,2,,,3,,, ]).take(2)                                   === seq([ 1,,,2 ])

// takeUntil()

// takeUntil works for Arrays, but it's not very useful
// because the result will always be an empty array.
[1,2,3].takeUntil([1])                                          === []

seq([1,,,2,,,3,,, ]).takeUntil(
seq([ ,,, ,,4 , ]))                                             === seq([ 1,,,2 ])
```