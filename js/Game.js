var game = {
	width: 10,
	height: 20,
	rows: [],

	tick: 200,

	initialize : function () {
		var i, j, newSquares;
		for(i = 0; i < this.height; i++) {
			newSquares = [];
			for(j = 0; j < this.width; j++) {
				newSquares.push(null);
			}
			
			this.rows.push({xabs: 0, yabs: i, squares: newSquares});
		}
	},
	
	tictac: function (callback) {
		this.tictacCallback = callback;
	},
	
	onBottomChange: function(callback){
		this.bottomChange = callback;
	},
	
	shiftFallingShape: function (dx, dy) {
		if(this.shape.xmin()+dx < 0 || this.shape.xmax()+dx >= this.width){
			dx = 0;
		} 
			
		this.shape.shift(dx, dy);
		
		if(this.hasShapeGotToBottom()){
			console.log("shape got to bottom");
			this.shape.shift(-dx, -dy);			
			this.shapeGotToBottom();
		}
	},
	
	hasShapeGotToBottom: function() {
		var i, square, rowIndex, squareIndex;
		
		if(this.shape.ymax() >= this.height)
			return true;
		
		for(i=0; i<this.shape.squares.length; i++) {
			square = this.shape.squares[i];
			
			rowIndex = this.shape.yabs + square.coords[1];
			squareIndex = this.shape.xabs + square.coords[0];
			
			console.log(rowIndex);
			
			if(this.rows[rowIndex].squares[squareIndex]) {
				return true;
			}
		}
		return false;		
	},
	
	rotateFallingShape: function () {
		this.shape.rotate();
		if(this.shape.xmin() < 0 || this.shape.xmax() >= this.width){
			this.shape.undoRotate();
		}
	},
	
	addFallingShapeToBottom: function () {
		var i, square, rowIndex, colIndex;
		for(i = 0; i < this.shape.squares.length; i++){
			square = this.shape.squares[i];
		
			square.color = "#e1e1e1"
		
			rowIndex = this.shape.yabs + square.coords[1];
			
			colIndex = this.shape.xabs + square.coords[0];
			square.coords[0] = colIndex;
			square.coords[1] = 0;

			this.rows[rowIndex].squares[colIndex] = square;
		}
	},
	
	shapeGotToBottom: function () {
		var i;
		
		console.log("in shapeGotToBottom");
		
		console.log("before addFallingShapeToBottom");
		
		this.addFallingShapeToBottom();
		
		this.shape = null;
		console.log("koko");
		
		this.eliminateCompleteRows();

		this.bottomChange();	
		
		this.createNewFallingShape();
	},

	eliminateCompleteRows: function() {
		var i, j, rowToEliminate, 
			completeRows = this.checkCompleteRows();	
		
		for(i=0; i<completeRows.length; i++) {
			rowToEliminate = completeRows[i];
			
			for(j=0; j<rowToEliminate.squares.length; j++) {
				rowToEliminate.squares[j] = null;
			}			
			
			for(j=i; j< rowToEliminate; j++) {
				this.rows[j+1].squares = this.rows[j].squares
			}
			
			for(j=0; j<this.rows[i].squares.length; j++) {
				this.rows[i].squares[j] = null;
			}
		}
	}, 
	
	checkCompleteRows: function() {
		var i, completeRows = [];
			
		for(i = 0; i<this.rows.length; i++) {
			if(this.isRowComplete(this.rows[i])) {
				completeRows.push(i);
			}
		}
		return completeRows;
	},

	isRowComplete: function(row) {
		var j;		
		for(j=0; j<row.squares.length; j++) {
			if(row.squares[j] === null) {
				return false;
				break;
			}
		}
		return true;
	},
		
	createNewFallingShape: function() {
		this.shape = ShapeMaker.getRandomShape();
		this.shape.xabs = this.width / 2 - 1;
		this.shape.yabs -= this.shape.ymin();
		if(this.hasShapeGotToBottom()) {
			clearInterval(this.currentInterval);
			console.log("game over");
		}
	},
	
	run: function () {
		this.createNewFallingShape();
		this.currentInterval = setInterval(this.tictacCallback, this.tick);
	} 
	
};

game.initialize();
