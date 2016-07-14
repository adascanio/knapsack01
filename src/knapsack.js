var clone = require('clone');

/**
 * Private function used to initialize solutions and values rows
 */
function __initInputs(values, solution, current, capacity) {
	for (var j =0; j <= capacity; j++) {
		values[current].push(0);
		solution[current].push([]);
	}
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
	var values = [[]];
	var solution = [[]];
	__initInputs(values, solution, 0, capacity);
	
	for(var i=1, len = items.length; i <=len; i++) {
		
		values.push([]);
		solution.push([])
		
		__initInputs(values, solution, i, capacity);

		for (var j = 0; j <= capacity; j++) {

			// the new item is more than the current weight limit
			if (items[i-1][map.weight] > j) {
				values[i][j] = values[i-1][j];
				solution[i][j] = clone(solution[i-1][j]);
			}
			//if the new item fits into the knapsack, it if the new total value
			//is greater than the current one (without it)
			else {
				
				//this is the index of the closer solution value that allows enough
				//room for the new item to be inserted
				var idxFittingItem = j-items[i-1][map.weight];

				//new value if current item is inserted
				var newValue = values[i-1][idxFittingItem] + items[i-1][map.value];

				//the previous value is kept if it is better than the one with the new item
				if (values[i-1][j] > newValue) {
					values[i][j] = values[i-1][j];
					solution[i][j] = clone(solution[i-1][j]);
					
				}
				//otherwise the new item is added and the value is updated
				else {

					values[i][j] = newValue;
					solution[i][j] = clone(solution[i-1][idxFittingItem]);
					solution[i][j].push(items[i-1]);
				}

			}
		}
		
	}

	return {
		valuesTable : values,
		solutionTable : solution,
		value : values[items.length][capacity],
		solution : solution[items.length][capacity]
	}
		
}

module.exports = {
	run : run
}