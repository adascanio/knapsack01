
/**
 * Private function used to initialize solutions and values rows
 */
function __initTempStructures(values, solution, capacity) {
	for (var j =0; j <= capacity; j++) {
		values[0].push(0);
		values[1].push(0);
		solution[0].push(0);
		solution[1].push(0);
	}
}

/**
 * Private function used to shift values from the sencond to the first row
 * when scanning the next element
 */
function __shiftTempStructures(values, solution, capacity) {
	//values[0] = clone(values[1]);
	for (var j =0; j <= capacity; j++) {
		values[0][j] = values[1][j];
		solution[0][j] = solution[1][j];
	}
	values[1] = [];
	solution[1]  = [];
	for (var j =0; j <= capacity; j++) {
		values[1].push(0);
		solution[1].push(0);
	}
}

/**
 * Build the solution object based on the solution binary representation
 * @param {Array} items
 * @param {Number} binary representation of the selected items 
 * @return {Object} contain the list of selected and unselected items in two different arrays 
 * <pre>solution</pre>
 * <pre>discarded</pre>
 */
function __buildSolution (items, bits) {
	var sol= [];
	var discarded = []
	for(var i =  0, len = items.length; i < len; i++){
		var item = items[i];
		var mask = 1 << i;
		
		if ((bits & mask) != 0) {
			sol.push(item);
		} 
		else {
			discarded.push(item);
		}
		
	}
	return {solution: sol, discarded : discarded};
} 
/**
 * Run the Knapsack problem (KP01) in pseudo polynomial time
 * assuming that Weight == Value 
 * @param {Array} items list of items to be inserted 
 * @param {number} capacity the knapsack capacity
 * @param {object} map object to map the item fields to weight and value 
 *
 */
function run(items, capacity, map) {

	map = map || {"weight": "weight", "value" : "value"};

	//table to store intermedites values
	var values = [[],[]];
	var solution = [[],[]];
	__initTempStructures(values, solution, capacity);

	items.sort((a, b) => { return a[map.weight] - b[map.weight]});
	
	for(var i=1, len = items.length; i <=len; i++) {
		
		__shiftTempStructures(values, solution, capacity);
		
		for (var j = items[0][map.weight]; j <= capacity;) {
			
			//console.log(j);
			// the new item is more than the current weight limit
			if (items[i-1][map.weight] > j) {
				values[1][j] = values[0][j];
				solution[1][j] = solution[0][j];
			}
			//if the new item fits into the knapsack, it if the new total value
			//is greater than the current one (without it)
			else {
				
				//this is the index of the closer solution value that allows enough
				//room for the new item to be inserted
				var idxFittingItem = j-items[i-1][map.weight];

				//new value if current item is inserted
				var newValue = values[0][idxFittingItem] + items[i-1][map.value];

				//the previous value is kept if it is better than the one with the new item
				if (values[0][j] > newValue) {
					values[1][j] = values[0][j];
					solution[1][j] = solution[0][j];
					
				}
				//otherwise the new item is added and the value is updated
				else {

					values[1][j] = newValue;
					solution[1][j] = solution[0][idxFittingItem];
					//set the flag for the ith-1 item as selected 
					solution[1][j] |= 1 << (i-1);
				}

			}


			var uBound = i == len ? capacity : Math.min(j + items[i][map.weight], capacity);
			

			if (uBound >= capacity) {
				j++;
			} 
			else{
				values[1].fill(values[1][j], j, uBound);
				j = uBound;
			}

console.log(values);
			
		}

	}
	

	
	var solutionMask = solution[1][capacity];
	var solutionObj = __buildSolution(items, solutionMask);
	
	return {
		valuesTable : values,
		value : values[1][capacity],
		solution : solutionObj.solution,
		discarded : solutionObj.discarded,
		solutionMask : solutionMask
	}
		
}

module.exports = {
	run : run
}