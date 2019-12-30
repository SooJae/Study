

import {concatMap, concatAll,zip} from './functions';

/* 첫번째 Zip 사용X*/

// var videos = [
// 			{
// 				"id": 70111470,
// 				"title": "Die Hard",
// 				"boxart": "http://cdn-0.nflximg.com/images/2891/DieHard.jpg",
// 				"uri": "http://api.netflix.com/catalog/titles/movies/70111470",
// 				"rating": 4.0,
// 			},
// 			{
// 				"id": 654356453,
// 				"title": "Bad Boys",
// 				"boxart": "http://cdn-0.nflximg.com/images/2891/BadBoys.jpg",
// 				"uri": "http://api.netflix.com/catalog/titles/movies/70111470",
// 				"rating": 5.0,
// 			},
// 			{
// 				"id": 65432445,
// 				"title": "The Chamber",
// 				"boxart": "http://cdn-0.nflximg.com/images/2891/TheChamber.jpg",
// 				"uri": "http://api.netflix.com/catalog/titles/movies/70111470",
// 				"rating": 4.0,
// 			},
// 			{
// 				"id": 675465,
// 				"title": "Fracture",
// 				"boxart": "http://cdn-0.nflximg.com/images/2891/Fracture.jpg",
// 				"uri": "http://api.netflix.com/catalog/titles/movies/70111470",
// 				"rating": 5.0,
// 			}
// 		],
// 		bookmarks = [
// 			{id: 470, time: 23432},
// 			{id: 453, time: 234324},
// 			{id: 445, time: 987834}
// 		],
// 	counter,
// 	videoIdAndBookmarkIdPairs = [];

// 	for(counter = 0; counter < Math.min(videos.length, bookmarks.length); counter++) {
//         // Insert code here to create a {videoId, bookmarkId} pair and add it to the videoIdAndBookmarkIdPairs array.
        
//         videoIdAndBookmarkIdPairs.push({videoId: videos[counter].id, bookmarkId: bookmarks[counter].id});
// 	}

//     const result = videoIdAndBookmarkIdPairs;
//     console.log(result);


/* 2번째 (Zip사용)*/
// var videos = [
// 			{
// 				"id": 70111470,
// 				"title": "Die Hard",
// 				"boxart": "http://cdn-0.nflximg.com/images/2891/DieHard.jpg",
// 				"uri": "http://api.netflix.com/catalog/titles/movies/70111470",
// 				"rating": 4.0,
// 			},
// 			{
// 				"id": 654356453,
// 				"title": "Bad Boys",
// 				"boxart": "http://cdn-0.nflximg.com/images/2891/BadBoys.jpg",
// 				"uri": "http://api.netflix.com/catalog/titles/movies/70111470",
// 				"rating": 5.0,
// 			},
// 			{
// 				"id": 65432445,
// 				"title": "The Chamber",
// 				"boxart": "http://cdn-0.nflximg.com/images/2891/TheChamber.jpg",
// 				"uri": "http://api.netflix.com/catalog/titles/movies/70111470",
// 				"rating": 4.0,
// 			},
// 			{
// 				"id": 675465,
// 				"title": "Fracture",
// 				"boxart": "http://cdn-0.nflximg.com/images/2891/Fracture.jpg",
// 				"uri": "http://api.netflix.com/catalog/titles/movies/70111470",
// 				"rating": 5.0,
// 			}
// 		],
// 		bookmarks = [
// 			{id: 470, time: 23432},
// 			{id: 453, time: 234324},
// 			{id: 445, time: 987834}
// 		];

//     const result = Array.zip(videos, bookmarks, (left, right) => {return{videoId: left.id, bookmarkId: right.id}});
    

//     console.log(result);
        

/* 3번째 */

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
						"interestingMoments": [
							{ type: "End", time:213432 },
							{ type: "Start", time: 64534 },
							{ type: "Middle", time: 323133}
						]
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
						"interestingMoments": [
							{ type: "End", time:54654754 },
							{ type: "Start", time: 43524243 },
							{ type: "Middle", time: 6575665}
						]
					}
				]
			},
			{
				name: "Instant Queue",
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
						"interestingMoments": [
							{ type: "End", time:132423 },
							{ type: "Start", time: 54637425 },
							{ type: "Middle", time: 3452343}
						]
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
						"interestingMoments": [
							{ type: "End", time:45632456 },
							{ type: "Start", time: 234534 },
							{ type: "Middle", time: 3453434}
						]
					}
				]
			}
		];



	//------------ COMPLETE THIS EXPRESSION --------------
	let result = movieLists.
        concatMap(movieList => movieList.videos
            .concatMap(video => Array
                .zip(video.boxarts
                    .reduce((acc,curr) => {
                        if(acc.width * acc.height < curr.width * curr.height){
                            return [acc];
                        } else {
                            return [curr];
                        }
                    }),
                    video.interestingMoments.filter(interestingMoment => interestingMoment.type === 'Middle')
                    ,
                    (boxart, interestingMoment) => {return {id:video.id, title:video.title, time:interestingMoment.time,url:boxart.url}}
                    )));
        
    console.log(result);
