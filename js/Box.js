'use strict';

var Box = function (width, height) {
	var i, j;
	this.width = width;
	this.height = height;
	this.squares = [];
	for (i = 0; i < this.width; i++) {
		for (j = 0; j < this.width; j++) {
			this.squares.push({color: "#fff", coords: [i, j]});
		}
	}
};
