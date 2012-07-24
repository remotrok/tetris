var game = {
	width: 10,
	height: 20,
	rows: [],
	tick: 500,
	score: 0,
	levelScore: 2,
	level: 1,

	initialize : function () {
		var i, j, newSquares;
		for (i = 0; i < this.height; i++) {
			this.rows.push({xabs: 0, yabs: i, squares: Array(this.width)});
		}
	},

	tictac: function (callback) {
		this.tictacCallback = callback;
	},

	onBottomChange: function (callback) {
		this.bottomChange = callback;
	},

	onRowsCompleted: function(callback) {
		this.updateScoreView = callback;
	},

	distanceToBottom: function () {
		var i, j, square, row, col,
			result = this.height - this.shape.ymax();
		for (i = 0; i < this.shape.squares.length; i++) {
			square = this.shape.squares[i];
			col = this.shape.xabs + square.coords[0];
			row = this.shape.yabs + square.coords[1];
			for (j = row + 1; j < this.rows.length; j++) {
				if (this.rows[j].squares[col]) {
					result = Math.min(result, j - row);
				}
			}
		}
		return result - 1;
	},

	shiftFallingShape: function (dx, dy) {
		this.shape.shift(dx, dy);

		if (this.isInvalidShapePosition()) {
			this.shape.shift(-dx, -dy);
			if (dy !== 0) {
				this.shapeGotToBottom();
			}
		}
	},

	isInvalidShapePosition: function () {
		var i, square, rowIndex, squareIndex;

		if (this.shape.ymax() >= this.height) {
			return true;
		}
		if (this.shape.xmin() < 0 || this.shape.xmax() >= this.width) {
			return true;
		}
		for (i=0; i<this.shape.squares.length; i++) {
			square = this.shape.squares[i];
			rowIndex = this.shape.yabs + square.coords[1];
			squareIndex = this.shape.xabs + square.coords[0];

			if (this.rows[rowIndex].squares[squareIndex]) {
				return true;
			}
		}
		return false;
	},

	rotateFallingShape: function () {
		this.shape.rotate();
		if (this.shape.xmin() < 0 || this.shape.xmax() >= this.width) {
			this.shape.undoRotate();
		}
	},

	addFallingShapeToBottom: function () {
		var i, square, rowIndex, colIndex;
		for (i = 0; i < this.shape.squares.length; i++) {
			square = this.shape.squares[i];

			square.color = "#e1e1e1";

			rowIndex = this.shape.yabs + square.coords[1];

			colIndex = this.shape.xabs + square.coords[0];
			square.coords[0] = colIndex;
			square.coords[1] = 0;

			this.rows[rowIndex].squares[colIndex] = square;
		}
	},

	shapeGotToBottom: function () {
		var completeRows;
		this.addFallingShapeToBottom();
		completeRows = this.getCompleteRows();
		this.updateScore(completeRows);
		this.eliminateCompleteRows(completeRows);
		this.bottomChange();
		this.createNewFallingShape();
	},

	eliminateCompleteRows: function (completeRows) {
		var i, j, rowToEliminate;
		for (i=0; i<completeRows.length; i++) {
			rowToEliminate = completeRows[i];

			for (j = rowToEliminate; j >= i + 1; j--) {
				this.rows[j].squares = this.rows[j-1].squares;
			}
			this.rows[i].squares = Array(this.width);
		}
	},

	updateScore: function (completeRows) {
		if (completeRows.length) {
			this.score += completeRows.length;
			this.level = 1 + Math.floor(this.score / this.levelScore);
			this.updateScoreView();
		}
	},

	getCompleteRows: function () {
		var i, completeRows = [];
		for (i = 0; i<this.rows.length; i++) {
			if (this.isRowComplete(this.rows[i])) {
				completeRows.push(i);
			}
		}
		return completeRows;
	},

	isRowComplete: function (row) {
		var j;
		for (j=0; j<row.squares.length; j++) {
			if (row.squares[j] === undefined) {
				return false;
			}
		}
		return true;
	},

	createNewFallingShape: function () {
		this.shape = ShapeMaker.getRandomShape();
		this.shape.xabs = this.width / 2 - 1;
		this.shape.yabs -= this.shape.ymin();
		if (this.isInvalidShapePosition()) {
			clearInterval(this.currentInterval);
			console.log("Game Over :'-(");
		}
	},

	run: function () {
		this.createNewFallingShape();
		this.currentInterval = setInterval(this.tictacCallback, this.tick);
	}
};

game.initialize();
