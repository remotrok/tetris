var gameUI = (function ()
{
	var self = {
		initialize: function(){
			this.game = game;
			this.canvas = document.getElementById('canvas');
	    	this.container = document.getElementById('container');
	    	this.painter = new Painter(this.canvas, this.container, this.game.width, this.game.height);

		    window.addEventListener('resize', this.resizeCanvas, false);

	    	this.resizeCanvas();

	    	this.canvas.addEventListener('click', this.rotate, false);
		},

		rotate: function () {
	        self.painter.clear(self.game.shape);
	        self.game.shape.rotate();
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
	    }
	};

	return self;
 }) ();
