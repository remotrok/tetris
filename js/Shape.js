'use strict';

function Shape(template) {
    var i;
    this.id = template.id;
    this.squares = [
        {color: template.color, coords: [0, 0]},
        {color: template.color, coords: [0, 0]},
        {color: template.color, coords: [0, 0]},
        {color: template.color, coords: [0, 0]}];

    for (i = 0; i < template.coords.length; i++) {
        this.squares[i].coords[0] = template.coords[i][0];
        this.squares[i].coords[1] = template.coords[i][1];
    }
    this.xabs = 0;
    this.yabs = 0;
}

Shape.prototype.shift = function (dx, dy) {
    this.xabs += dx;
    this.yabs += dy;
};

Shape.prototype.applyRotation = function (sign) {
	var i, temp;
    for (i = 0; i < this.squares.length; i++) {
		temp = this.squares[i].coords[0];
		this.squares[i].coords[0] = sign[0] * this.squares[i].coords[1];
		this.squares[i].coords[1] = sign[1] * temp;
	}	
};

Shape.prototype.rotate = function () {
	if(this.id === 'C')
		return;
	this.applyRotation([1, -1]);
};

Shape.prototype.undoRotate = function () {
	if(this.id === 'C')
		return;
	this.applyRotation([-1, 1]);
};

Shape.prototype.extremalCoord = function(index, func) {
	return function(){
		var i;
		var result = this.squares[0].coords[index];
		for(i=1; i < this.squares.length; i++) {
			result = func(result, this.squares[i].coords[index]); 
		}
		
		var coordMax = (index === 1) ? this.yabs : this.xabs;
		
		return coordMax + result;
	}
};

Shape.prototype.xmin = Shape.prototype.extremalCoord(0, Math.min);
Shape.prototype.ymin = Shape.prototype.extremalCoord(1, Math.min);
Shape.prototype.xmax = Shape.prototype.extremalCoord(0, Math.max);
Shape.prototype.ymax = Shape.prototype.extremalCoord(1, Math.max);

