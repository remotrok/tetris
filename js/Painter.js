var Painter = function (canvas, container, width, height) {
    var i, x, y;

    this.canvas = canvas;

    this.container = container;

    this.context = canvas.getContext('2d');

    this.width = width;

    this.height = height;

    this.l = 1;

    this.visitor = function (action, shape) {
        for (i = 0; i < shape.squares.length; i++) {
        	var square = shape.squares[i];
        	
        	if(square)
        	{
		        x = (shape.xabs + square.coords[0]) * this.l;
		        y = (shape.yabs + square.coords[1]) * this.l;

		        action.call(this, x, y, square);
            }
        }
    };

    this.fillSquare = function (x, y, square) {
        this.context.fillStyle = square.color;
        this.context.fillRect(x, y, this.l, this.l);
    };

    this.draw = function (shape) {
    	if(shape){
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
        }
    };

    this.clear = function (shape) {
        this.visitor(function (x, y, square) {
            this.context.clearRect(x - 4, y - 4, this.l + 8, this.l + 8);
        }, shape);
    };
};
