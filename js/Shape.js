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

Shape.prototype.rotate = function () {
    var i, temp;
    for (i = 0; i < this.squares.length; i++) {
        temp = this.squares[i].coords[0];
        this.squares[i].coords[0] = this.squares[i].coords[1];
        this.squares[i].coords[1] = -temp;
    }
};
