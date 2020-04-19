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

// JSON.stringify(Array.zip([1,2,3],[4,5,6], function(left, right) { return left + right })) === '[5,7,9]'

Array.zip = function(left, right, combinerFunction) {
	var counter,
		results = [];

	for(counter = 0; counter < Math.min(left.length, right.length); counter++) {
		results.push(combinerFunction(left[counter],right[counter]));
	}

	return results;
};


/* 첫번째 */
	// const lists = [
	// 		{
	// 			"id": 5434364,
	// 			"name": "New Releases"
	// 		},
	// 		{
	// 			"id": 65456475,
	// 			"name": "Thrillers"
	// 		}
	// 	],
	//     videos = [
	// 		{
	// 			"listId": 5434364,
	// 			"id": 65432445,
	// 			"title": "The Chamber"
	// 		},
	// 		{
	// 			"listId": 5434364,
	// 			"id": 675465,
	// 			"title": "Fracture"
	// 		},
	// 		{
	// 			"listId": 65456475,
	// 			"id": 70111470,
	// 			"title": "Die Hard"
	// 		},
	// 		{
	// 			"listId": 65456475,
	// 			"id": 654356453,
	// 			"title": "Bad Boys"
	// 		}
	// 	];

    // const result =  lists
    // .map(list => {
    //     return {name: list.name, videos:videos
    //         .filter(video => video.listId === list.id)
    //         .map(video => {return {id: video.id, title:video.title}})
    //     }
    // }); // complete this expression
    // console.log(result);

/* 두 번째 */

	var lists = [
			{
				"id": 5434364,
				"name": "New Releases"
			},
			{
				"id": 65456475,
				"name": "Thrillers"
			}
		],
		videos = [
			{
				"listId": 5434364,
				"id": 65432445,
				"title": "The Chamber"
			},
			{
				"listId": 5434364,
				"id": 675465,
				"title": "Fracture"
			},
			{
				"listId": 65456475,
				"id": 70111470,
				"title": "Die Hard"
			},
			{
				"listId": 65456475,
				"id": 654356453,
				"title": "Bad Boys"
			}
		],
		boxarts = [
			{ videoId: 65432445, width: 130, height:200, url:"http://cdn-0.nflximg.com/images/2891/TheChamber130.jpg" },
			{ videoId: 65432445, width: 200, height:200, url:"http://cdn-0.nflximg.com/images/2891/TheChamber200.jpg" },
			{ videoId: 675465, width: 200, height:200, url:"http://cdn-0.nflximg.com/images/2891/Fracture200.jpg" },
			{ videoId: 675465, width: 120, height:200, url:"http://cdn-0.nflximg.com/images/2891/Fracture120.jpg" },
			{ videoId: 675465, width: 300, height:200, url:"http://cdn-0.nflximg.com/images/2891/Fracture300.jpg" },
			{ videoId: 70111470, width: 150, height:200, url:"http://cdn-0.nflximg.com/images/2891/DieHard150.jpg" },
			{ videoId: 70111470, width: 200, height:200, url:"http://cdn-0.nflximg.com/images/2891/DieHard200.jpg" },
			{ videoId: 654356453, width: 200, height:200, url:"http://cdn-0.nflximg.com/images/2891/BadBoys200.jpg" },
			{ videoId: 654356453, width: 140, height:200, url:"http://cdn-0.nflximg.com/images/2891/BadBoys140.jpg" }
		],
		bookmarks = [
			{ videoId: 65432445, time: 32432 },
			{ videoId: 675465, time: 3534543 },
			{ videoId: 70111470, time: 645243 },
			{ videoId: 654356453, time: 984934 }
		];

    const result = lists
    .map(list => {return {
        name : list.name, 
        videos: 
            videos.
                filter(video => video.listId === list.id).
                concatMap(video => {
                    return Array.zip(
                        bookmarks.filter(bookmark => bookmark.videoId === video.id),
                        boxarts
                        .filter(boxart => boxart.videoId === video.id)
                        .reduce((acc,curr) => acc.width * acc.height < curr.width * curr.height ? [acc] : [curr]),
                        (bookmark, boxart) => {
                            return { id: video.id, title: video.title, time: bookmark.time, boxart: boxart.url }
                        });
            })
        
    }}
)
    
    console.log(result);


		