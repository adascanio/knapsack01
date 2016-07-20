var testee = require('../src/knapsack.js');
var assert = require('chai').assert;



describe("knapsack problem 01", function() {
  var simpleData = require('./data/simple_data');


    it("#run() return value == 7 for capacity 7", function() {
		var capacity = 7;
    	var solution = testee.run(simpleData.items, capacity);
   		assert.equal(solution.value, 7);
    });

    it("#run() return value == 10 for capacity 11", function() {
		var capacity = 11;
    	var solution = testee.run(simpleData.items, capacity);
   		assert.equal(solution.value, 10);
    });

    it("#run() return value == 13 for capacity 15", function() {
		var capacity = 15;
    	var solution = testee.run(simpleData.items, capacity);
   		assert.equal(solution.value, 13);
    });

    it("#run() return value == 0 for capacity 2", function() {
		var capacity = 2;
    	var solution = testee.run(simpleData.items, capacity);
   		assert.equal(solution.value, 0);
    });

    it("#run() return value == 20 for capacity 21", function() {
		var capacity = 21;
    	var solution = testee.run(simpleData.items, capacity);
   		assert.equal(solution.value, 20);
    });
  
});

describe("knapsack problem 01 with 15 weights ", function() {
   var dataset = require("./data/dataset_15");
    it("#run() return ", function() {
    var capacity = dataset.capacity;
    var optimal = dataset.optimal;
    
      var solution = testee.run(dataset.items, capacity, {"weight" : "cost", "value" : "profit"});
      assert.equal(solution.value, optimal);
    });
  
});

describe("knapsack problem 01 with 24 weights ", function() {
   var dataset = require("./data/dataset_24");
    it("#run() return ", function() {
    this.timeout(10000);
    var capacity = dataset.capacity;
    var optimal = dataset.optimal;
    
      var solution = testee.run(dataset.items, capacity, {"weight" : "cost", "value" : "profit"});
      assert.equal(solution.value, optimal);
    });
  
});

