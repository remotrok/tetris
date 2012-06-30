var game = {
	width: 10,
	height: 20,
	rows: [],

	initialize : function () {
		this.shape = ShapeMaker.getRandomShape();
		this.shape.xabs = 40;
		this.shape.yabs = 40;
	}
};

game.initialize();
