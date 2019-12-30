export * from './functions';


const concatAll = function(this: any) {
	var results: any[] | never[] = [];
	this.forEach(function(subArray: never[]) {
		results.push.apply(results, subArray);
	});
	
	return results;

	// JSON.stringify([ [1,2,3], [4,5,6], [7,8,9] ].concatAll()) === "[1,2,3,4,5,6,7,8,9]"
	// [1,2,3].concatAll(); // throws an error because this is a one-dimensional array
};

const concatMap = function(this: any, projectionFunctionThatReturnsArray: (arg0: any) => void) {
	
	return this.
		map(function(item: any) {
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

const zip = function(left: any[], right: any[], combinerFunction: (arg0: any, arg1: any) => void) {
	var counter,
		results = [];

	for(counter = 0; counter < Math.min(left.length, right.length); counter++) {
		results.push(combinerFunction(left[counter],right[counter]));
	}

	return results;
};