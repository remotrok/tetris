'use strict';

function Shape(template) {
    var i;
    this.color = template.color;
    this.id = template.id;
    this.coords = [[0, 0], [0, 0], [0, 0], [0, 0]];
    for (i = 0; i < template.coords.length; i++) {
        this.coords[i][0] = template.coords[i][0];
        this.coords[i][1] = template.coords[i][1];
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
    for (i = 0; i < this.coords.length; i++) {
        temp = this.coords[i][0];
        this.coords[i][0] = this.coords[i][1];
        this.coords[i][1] = -temp;
    }
};
