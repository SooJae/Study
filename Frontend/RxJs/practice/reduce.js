
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



//1 단계 forEach사용
	// var boxarts = [
	// 		{ width: 200, height: 200, url: "http://cdn-0.nflximg.com/images/2891/Fracture200.jpg" },
	// 		{ width: 150, height: 200, url: "http://cdn-0.nflximg.com/images/2891/Fracture150.jpg" },
	// 		{ width: 300, height: 200, url: "http://cdn-0.nflximg.com/images/2891/Fracture300.jpg" },
	// 		{ width: 425, height: 150, url: "http://cdn-0.nflximg.com/images/2891/Fracture425.jpg" }
	// 	],
	// 	currentSize,
	// 	maxSize = -1,
	// 	largestBoxart;

	// boxarts.forEach(function(boxart) {
	// 	currentSize = boxart.width * boxart.height;
	// 	if (currentSize > maxSize) {
	// 		largestBoxart = boxart;
	// 		maxSize = currentSize;
	// 	}
	// });

	// console.log(largestBoxart) ;



// 2단계

// var boxarts = [
//         { width: 200, height: 200, url: "http://cdn-0.nflximg.com/images/2891/Fracture200.jpg" },
//         { width: 150, height: 200, url: "http://cdn-0.nflximg.com/images/2891/Fracture150.jpg" },
//         { width: 300, height: 200, url: "http://cdn-0.nflximg.com/images/2891/Fracture300.jpg" },
//         { width: 425, height: 150, url: "http://cdn-0.nflximg.com/images/2891/Fracture425.jpg" }
//     ];

// // You should return an array containing only the URL of the largest box art. Remember that reduce always
// // returns an array with one item.
// let result = boxarts
// .reduce(
//     (acc , cur)=> {
//     if (acc.width * acc.height > cur.width * cur.height) {
//         return [acc];
//       }
//       else {
//         return [cur];
//       }
//     }).map(boxart => boxart.url);
    


// console.log(result);



/* 3단계 */
var videos = [
		{
			"id": 65432445,
			"title": "The Chamber"
		},
		{
			"id": 675465,
			"title": "Fracture"
		},
		{
			"id": 70111470,
			"title": "Die Hard"
		},
		{
			"id": 654356453,
			"title": "Bad Boys"
		}
	];

	// Expecting this output...
	// [
	//	 {
	//		 "65432445": "The Chamber",
	//		 "675465": "Fracture",
	//		 "70111470": "Die Hard",
	//		 "654356453": "Bad Boys"
	//	 }
	// ]
    

    /* 4번째 */

    // const result = videos.
	// 	reduce((accumulatedMap, video) => {
    //     var obj = {};
    //     obj[video.id] = video.title
        

	// 	return Object.assign(accumulatedMap, obj);
	// 	}, {});

        
    // console.log(result);



    var movieLists = [
		{
			name: "New Releases",
			videos: [
				{
					"id": 70111470,
					"title": "Die Hard",
					"boxarts": [
						{ width: 150, height:200, url:"http://cdn-0.nflximg.com/images/2891/DieHard150.jpg" },
						{ width: 200, height:200, url:"http://cdn-0.nflximg.com/images/2891/DieHard200.jpg" }
					],
					"url": "http://api.netflix.com/catalog/titles/movies/70111470",
					"rating": 4.0,
					"bookmark": []
				},
				{
					"id": 654356453,
					"title": "Bad Boys",
					"boxarts": [
						{ width: 200, height:200, url:"http://cdn-0.nflximg.com/images/2891/BadBoys200.jpg" },
						{ width: 140, height:200, url:"http://cdn-0.nflximg.com/images/2891/BadBoys140.jpg" }

					],
					"url": "http://api.netflix.com/catalog/titles/movies/70111470",
					"rating": 5.0,
					"bookmark": [{ id:432534, time:65876586 }]
				}
			]
		},
		{
			name: "Thrillers",
			videos: [
				{
					"id": 65432445,
					"title": "The Chamber",
					"boxarts": [
						{ width: 130, height:200, url:"http://cdn-0.nflximg.com/images/2891/TheChamber130.jpg" },
						{ width: 200, height:200, url:"http://cdn-0.nflximg.com/images/2891/TheChamber200.jpg" }
					],
					"url": "http://api.netflix.com/catalog/titles/movies/70111470",
					"rating": 4.0,
					"bookmark": []
				},
				{
					"id": 675465,
					"title": "Fracture",
					"boxarts": [
						{ width: 200, height:200, url:"http://cdn-0.nflximg.com/images/2891/Fracture200.jpg" },
						{ width: 120, height:200, url:"http://cdn-0.nflximg.com/images/2891/Fracture120.jpg" },
						{ width: 300, height:200, url:"http://cdn-0.nflximg.com/images/2891/Fracture300.jpg" }
					],
					"url": "http://api.netflix.com/catalog/titles/movies/70111470",
					"rating": 5.0,
					"bookmark": [{ id:432534, time:65876586 }]
				}
			]
		}
	];


	// Use one or more concatMap, map, and reduce calls to create an array with the following items (order matters)
	// [
	//	 {"id": 675465,"title": "Fracture","boxart":"http://cdn-0.nflximg.com/images/2891/Fracture120.jpg" },
	//	 {"id": 65432445,"title": "The Chamber","boxart":"http://cdn-0.nflximg.com/images/2891/TheChamber130.jpg" },
	//	 {"id": 654356453,"title": "Bad Boys","boxart":"http://cdn-0.nflximg.com/images/2891/BadBoys140.jpg" },
	//	 {"id": 70111470,"title": "Die Hard","boxart":"http://cdn-0.nflximg.com/images/2891/DieHard150.jpg" }
	// ];

    const result = movieLists
    .concatMap(movieList => movieList.videos
        .concatMap(video => video.boxarts
            .reduce((acc, curr) => {
            if (acc.width * acc.height < curr.width * curr.height) {
                return [acc];
              }
              else {
                return [curr];
              }
             /*
             [ { width: 150,
                height: 200,
                url: 'http://cdn-0.nflximg.com/images/2891/DieHard150.jpg' },
            { width: 140,
                height: 200,
                url: 'http://cdn-0.nflximg.com/images/2891/BadBoys140.jpg' },
            { width: 130,
                height: 200,
                url: 'http://cdn-0.nflximg.com/images/2891/TheChamber130.jpg' },
            { width: 300,
                height: 200,
                url: 'http://cdn-0.nflximg.com/images/2891/Fracture300.jpg' } ]
             */
            })
            .map(boxart => {return {id:video.id, title:video.title, boxart:boxart.url}}) //reduce 한 값들만 뽑아서 매핑한다.
        ))
        
    
    console.log(result);