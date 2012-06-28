/*global ShapeMaker*/
'use strict';

var Painter = function (canvas, l) {
    var i, x, y;
    this.canvas = canvas;

    this.context = canvas.getContext('2d');

    this.l = l;

    this.visitor = function (action, shape) {
        for (i = 0; i < shape.squares.length; i++) {
            x = shape.xabs + shape.squares[i].coords[0] * this.l;
            y = shape.yabs + shape.squares[i].coords[1] * this.l;

            action.call(this, x, y, shape.squares[i]);
        }
    };

    this.fillSquare = function (x, y, square) {
        this.context.fillStyle = square.color;
        this.context.fillRect(x, y, this.l, this.l);
    };

    this.draw = function (shape) {
        this.context.strokeStyle = '#000';
        this.context.shadowOffsetX = 0;
        this.context.shadowOffsetY = 2;
        this.context.shadowBlur = 2;
        this.context.shadowColor   = 'rgba(0, 0, 0, 0.5)';

        this.visitor(function (x, y, square) {
            this.context.fillStyle = square.color;
            this.context.fillRect(x, y, this.l, this.l);
        }, shape);

        this.context.lineWidth = 2;
        this.context.shadowColor   = 'rgba(0, 0, 0, 0.0)';

        this.visitor(function (x, y, square) {
            this.context.fillStyle = shape.squares[i].color;
            this.context.fillRect(x, y, this.l, this.l);
            this.context.strokeRect(x, y, this.l, this.l);
        }, shape);
        console.log(shape.id);
    };

    this.clear = function (shape) {
        this.visitor(function (x, y, square) {
            this.context.clearRect(x - 4, y - 4, this.l + 8, this.l + 8);
        }, shape);
        console.log(shape.id);
    };
};

window.onload = function () {
    var painter = new Painter(document.getElementById('canvas'), 20),
        shape = ShapeMaker.getRandomShape();

    shape.xabs = 40;
    shape.yabs = 40;

    painter.draw(shape);

    painter.canvas.onclick = function () {
        painter.clear(shape);
        shape.rotate();
        painter.draw(shape);
    };


};


