var testee = require('../src/knapsack.js');
var assert = require('chai').assert;

var data = {
    	"cards" : [{"weight": 3, "value" : 3 , id:1},{"weight": 5, "value" : 5, id:2},{"weight": 4, "value": 4, id:3}]
}


describe("knapsack problem 01", function() {


    it("#run() return value == 7 for capacity 7", function() {
		var capacity = 7;
    	var solution = testee.run(data.cards, capacity);
   		assert.equal(solution.value, capacity);
    });

    it("#run() return value == 8 for capacity 8", function() {
		var capacity = 8;
    	var solution = testee.run(data.cards, capacity);
   		assert.equal(solution.value, capacity);
    });

    it("#run() return value == 9 for capacity 10", function() {
		var capacity = 10;
    	var solution = testee.run(data.cards, capacity);
   		assert.equal(solution.value, 9);
    });

    it("#run() return value == 0 for capacity 2", function() {
		var capacity = 2;
    	var solution = testee.run(data.cards, capacity);
   		assert.equal(solution.value, 0);
    });

    it("#run() return value == 12 for capacity 15", function() {
		var capacity = 15;
    	var solution = testee.run(data.cards, capacity);
   		assert.equal(solution.value, 12);
    });
  
});

describe("knapsack problem 01 with 24 weights ", function() {
   var dataset = require("./dataset");
    xit("#run() return ", function() {
    var capacity = dataset.capacity;
    var optimal = dataset.optimal;
    
      var solution = testee.run(dataset.items, capacity, {"weight" : "cost", "value" : "profit"});
      assert.equal(solution.value, optimal);
    });
  
});