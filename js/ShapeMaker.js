function Shape(template) {
	this.color = template.color;
	
	this.id = template.id;
	
	this.coords = [[0, 0], [0, 0], [0, 0], [0, 0]];
	
	for(var i = 0; i<template.coords.length; i++) {
		this.coords[i][0] = template.coords[i][0];
		this.coords[i][1] = template.coords[i][1];
	} 
	
	this.xabs = 0;
	this.yabs = 0;
}

Shape.prototype.shift = function(dx, dy) {
	this.xabs += dx;
	this.yabs += dy;
}

Shape.prototype.rotate = function() {
	for(var i = 0; i<this.coords.length; i++) {
		var temp = this.coords[i][0];
		this.coords[i][0] = this.coords[i][1];
		this.coords[i][1] = -temp;
	} 
}

var ShapeMaker = {

	make : function(template) {
		return new Shape(template);		
	},

	getRandomShape : function() {
		return this.make(this.tetramins[Math.floor(Math.random() * 7)]);		
	},
	
	tetramins : [
		{ id : "C", "color" : "#000",
			"coords" : [[0, 0], [-1, -1], [-1, 0], [0, -1]] 
		},

		{ id : "L", "color" : "#123",
				"coords" : [[0, 0], [0,-1], [0, 1], [1, 1]] 
		},

		{ id : "LI", "color" : "#123",
				"coords" : [[0, 0], [0,-1], [0, 1], [-1, 1]] 
		},

		{ id : "Z", "color" : "#123",
				"coords" : [[0, 0], [0, -1], [-1, -1], [1, 0]] 
		},
	
		{ id : "S", "color" : "#123",
				"coords" : [[0, 0], [-1, 0], [0, -1], [1, -1]] 
		},
	
		{ id : "T", "color" : "#123",
			"coords" : [[0, 0], [-1, 0], [0, -1], [1, 0]]  
		},

		{ id : "B", "color" : "#123",
			"coords" : [[-1, 0], [0, 0], [1, 0], [2, 0]]
		}
	]
};
