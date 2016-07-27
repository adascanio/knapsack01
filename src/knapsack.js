
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
 * Build the solution object based on the solution binary representation
 * @param {Array} items
 * @param {Number} binary representation of the selected items 
 * @return {Object} contain the list of selected and unselected items in two different arrays 
 * <pre>selected</pre>
 *    <pre>items</pre> the list of selected items (the problem solution)
 *    <pre>totalValue</pre> the total value (the problem solution value)
 *    <pre>totalCost</pre> the total cost (the weight used by the selected items)
 * <pre>excluded</pre>
 *    <pre>items</pre> the list of excluded items 
 *    <pre>totalValue</pre> the total value left out of the knapsack
 *    <pre>totalCost</pre> the total cost of excluded items
 */
function __buildSolution (items, bits, map) {

	var sol= [];
	var excluded = []

	var totalValue = 0,
		totalCost = 0,
		totalExcludedValue = 0,
		totalExcludedCost = 0;

	var valueMap = map.value;
	var weightMap = map.Weight;
	for(var i =  0, len = items.length; i < len; i++){
		var item = items[i];
		var mask = 1 << i;
		
		//the flag is up so the item has been selected
		if ((bits & mask) != 0) {
			sol.push(item);
			totalValue += item[valueMap];
			totalCost += item[weightMap];
		} 
		else {
			excluded.push(item);
			totalExcludedValue += item[valueMap];
			totalExcludedCost += item[weightMap];
		}
		
	}
	return { 
			selected: {
				items : sol,
				totalValue : totalValue,
				totalCost  : totalCost
			},
			excluded : {
				items : excluded,
				totalValue : totalExcludedValue,
				totalCost  : totalExcludedCost
			}
			
		};
} 

/**
 * Run the Knapsack problem (KP01) in pseudo polynomial time
 * assuming that Weight == Value 
 * @param {Array} items list of items to be inserted 
 * @param {number} capacity the knapsack capacity
 * @param {object} map object to map the item fields to weight and value
 * @return {object} the solution:
 	<pre>value</pre> the total solution value
 	<pre>solution</pre> @see solution Object
 	<pre>solutionMask</pre> bit mask indicating the selected items
 *
 */
function run(items, capacity, map) {

	map = map || {"weight": "weight", "value" : "value"};

	//table to store intermedites values
	var values = [[],[]];
	var solution = [[],[]];
	__initTempStructures(values, solution, capacity);

	for(var i=1, len = items.length; i <=len; i++) {
		
		//shift the calculated values and solution to the previous row
		values[0] = values[1].slice();
		solution[0] = solution[1].slice();

		for (var j = items[i-1][map.weight]; j <= capacity; j++) {
			
			
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
		
		}

	}
	
	var solutionMask = solution[1][capacity];
	var solutionObj = __buildSolution(items, solutionMask, map);
	
	return {
		value : values[1][capacity],
		solution : solutionObj,
		solutionMask : solutionMask
	}
		
}

module.exports = {
	run : run
}