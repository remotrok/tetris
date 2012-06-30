var gameUI = (function ()
{
	var self = {
		initialize: function(){
			this.game = game;
			this.game.tictac(this.moveDown);
			this.game.onBottomChange(this.drawBottom);
			this.canvas = document.getElementById('canvas');
	    	this.container = document.getElementById('container');
	    	this.painter = new Painter(this.canvas, this.container, this.game.width, this.game.height);

		    window.addEventListener('resize', this.resizeCanvas, false);

	    	this.resizeCanvas();

	    	this.canvas.addEventListener('click', this.rotate, false);

	    	window.onkeydown = function(event) {
	    		if(event.which === 38){
	    			self.rotateFallingShape();
	    		}
	    		if(event.which === 37){
	    			self.shiftFallingShape(-1, 0);
	    		}
	    		if(event.which === 39){
	    			self.shiftFallingShape(1, 0);
	    		}
	    	}
	    },

		rotateFallingShape: function () {
	        self.painter.clear(self.game.shape);
	        self.game.rotateFallingShape();
	        self.painter.draw(self.game.shape);
		},
		
		shiftFallingShape: function (dx, dy) {
	        self.painter.clear(self.game.shape);
	        self.game.shiftFallingShape(dx, dy);
	        self.painter.draw(self.game.shape);
		},
		
		setCanvasDimensions: function(){
	        var ratio = this.game.height / this.game.width;
	        if(this.container.offsetHeight / this.container.offsetWidth < ratio) {
	            this.canvas.height = this.container.offsetHeight;
	            this.canvas.width = this.container.offsetHeight / ratio;
	        }
	        else {
	            this.canvas.width = this.container.offsetWidth;
	            this.canvas.height = ratio * this.container.offsetWidth;
	        }
	    },

	    resizeCanvas: function() {
	        self.setCanvasDimensions();
	        self.painter.l = self.canvas.width / self.game.width;
	        self.painter.draw(self.game.shape);
	    },
	    
	    moveDown: function(){
			self.shiftFallingShape(0,1);
		},
		
		drawBottom: function() {
			var i;
			
			self.resizeCanvas();
			
			for(i = 0; i < self.game.rows.length; i++){
				self.painter.draw(self.game.rows[i]);
			}
		}
	};

	return self;
 }) ();
