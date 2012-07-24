'use strict';

var Painter = function (canvas, container, width, height) {

    this.canvas = canvas;
    this.container = container;
    this.context = canvas.getContext('2d');
    this.width = width;
    this.height = height;

    function visitor(action, shape, l) {
        var i, x, y;
        for (i = 0; i < shape.squares.length; i++) {
            var square = shape.squares[i];

            if (square) {
                x = (shape.xabs + square.coords[0]) * l;
                y = (shape.yabs + square.coords[1]) * l;
                action.call(this, x, y, square);
            }
        }
    }

    this._draw = function (shape, l) {
        if (shape) {
            this.context.strokeStyle = '#000';
            this.context.shadowOffsetX = 0;
            this.context.shadowOffsetY = 2;
            this.context.shadowBlur = 2;
            this.context.shadowColor   = 'rgba(0, 0, 0, 0.5)';

            visitor.call(this, function (x, y, square) {
                this.context.fillStyle = square.color;
                this.context.fillRect(x, y, l, l);
            }, shape, l);

            this.context.lineWidth = 2;
            this.context.shadowColor   = 'rgba(0, 0, 0, 0.0)';

            visitor.call(this, function (x, y, square) {
                this.context.fillStyle = square.color;
                this.context.fillRect(x, y, l, l);
                this.context.strokeRect(x, y, l, l);
            }, shape, l);
        }
    };

    this.draw = function (shape, l) {
        this.canvas.width = this.canvas.width;
        this._draw(shape, l);
    };

    this.drawShapes = function (shapes, l) {
        var j;
        this.canvas.width = this.canvas.width;
        for (j = 0; j < shapes.length; j++) {
                this._draw(shapes[j], l);
            }
    };

    this.clear = function (shape, l) {
        visitor.call(this, function (x, y, square) {
            this.context.clearRect(x - 4, y - 4, l + 8, l + 8);
        }, shape, l);
    };
};
