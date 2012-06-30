var game = {
	width: 10,
	height: 20,
	rows: [],

	initialize : function () {
		//TODO fill rows
	},
	
	tictac: function (callback) {
		this.tictacCallback = callback;
	},
	
	shiftFallingShape: function (dx, dy) {
		console.log(this.shape.ymax(), dy, this.height)
		
		if(this.shape.xmin()+dx < 0 || this.shape.xmax()+dx >= this.width){
			dx = 0;
		}
		
		if(this.shape.ymax()+dy >= this.height){
			dy = 0;
		}
		
		this.shape.shift(dx, dy);
	},
	
	rotateFallingShape: function () {
		this.shape.rotate();
		if(this.shape.xmin() < 0 || this.shape.xmax() >= this.width){
			this.shape.undoRotate();
		}
	},
	
	step: function () {
		this.shape = ShapeMaker.getRandomShape();
		this.shape.xabs = this.width / 2 - 1;
		setInterval(this.tictacCallback, 1000);
	}
};

game.initialize();
