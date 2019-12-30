# concatAll()
이중 배열일경우 배열 하나로 변환한다.
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