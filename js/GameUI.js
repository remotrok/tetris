var gameUI = (function ()
{
    var self = {
        initialize: function () {
            var interval = 0;

            this.game = game;
            this.game.tictac(this.moveDown);
            this.game.onBottomChange(this.drawBottom);
            this.game.onRowsCompleted(this.updateScore);
            this.game.onLevelChange(this.updateLevel);
            this.game.onGameOver(this.closeCurtain);

            this.canvas = document.getElementById('canvas');
            this.canvasBottom = document.getElementById('canvasBottom');
            this.container = document.getElementById('container');
            this.score = document.getElementById('score');
            this.level = document.getElementById('level');
            this.curtain = document.getElementById('curtain');
            this.message = document.getElementById('message');


            this.painter = new Painter(this.canvas, this.container, this.game.width, this.game.height);
            this.bottomPainter = new Painter(this.canvasBottom, this.container, this.game.width, this.game.height);

            window.addEventListener('resize', this.resizeCanvas, false);

            this.resizeCanvas();

            document.body.addEventListener('touchmove', function (event) {
                event.preventDefault();
            }, false);

            this.canvas.ontouchstart = function (event) {
                self.touchStartAt = event.touches[0].pageY;
                self.touchStarted = true;
            };

            this.canvas.ontouchmove = function (event) {
                var touchDistance = event.touches[0].pageY - self.touchStartAt;
                if(self.touchStarted && touchDistance > 1){
                    self.fallingShapeToBottom();
                    self.foo = true;
                }
                self.touchStarted = false;
            };

            this.canvas.ontouchend = function (event) {
                if(!self.foo) {
                    self.rotateFallingShape();
                }
                self.foo = false;
            };

            window.addEventListener('deviceorientation', function (event) {
                var dx;
                dx = event.gamma / Math.abs(event.gamma);
                if (Math.abs(event.gamma) > 10) {
                    if (interval === 0) {
                        self.shiftFallingShape(dx , 0);
                        interval = setInterval(function(){
                            self.shiftFallingShape(dx , 0);
                        }, 200);
                    }
                }  else if(interval !== 0){
                    clearInterval(interval);
                    interval = 0;
                }
            });

            window.onkeydown = function(event) {
                if (event.which === 32) {
                    self.start();
                }
                if (event.which === 38) {
                    self.rotateFallingShape();
                }
                if (event.which === 37) {
                    self.shiftFallingShape(-1, 0);
                }
                if (event.which === 39) {
                    self.shiftFallingShape(1, 0);
                }
                if (event.which === 40) {
                    self.fallingShapeToBottom();
                }

            };
        },

        rotateFallingShape: function () {
            self.game.rotateFallingShape();
            self.painter.redraw(self.game.shape, self.l);
        },

        shiftFallingShape: function (dx, dy) {
            self.game.shiftFallingShape(dx, dy);
            self.painter.redraw(self.game.shape, self.l);
        },

        fallingShapeToBottom: function () {
            self.game.shiftFallingShape(0, self.game.distanceToBottom());
            self.painter.redraw(self.game.shape, self.l);
        },

        setCanvasDimensions: function (canvas) {
            var ratio = this.game.height / this.game.width,
                paddingTop = +window.getComputedStyle(this.container).getPropertyValue("padding-top").slice(0, -2),
                paddingBottom = +window.getComputedStyle(this.container).getPropertyValue("padding-bottom").slice(0, -2);
            if (this.container.offsetHeight / this.container.offsetWidth < ratio) {
                canvas.width = this.container.offsetHeight / ratio;
            }
            else {
                canvas.width = this.container.offsetWidth;
            }
            canvas.width -= (paddingTop + paddingBottom);
            canvas.height = ratio * canvas.width;

            canvas.style.left = (this.container.offsetWidth - canvas.width)/2.0 + 'px';
        },

        setCurtainDimensions: function () {
            this.curtain.style.width = this.canvas.width + 4 + 'px';
            this.curtain.style.left = this.canvas.style.left.slice(0, -2) - 2 + 'px';
        },

        resizeCanvas: function () {
            self.setCanvasDimensions(self.canvas);
            self.setCanvasDimensions(self.canvasBottom);
            self.setCurtainDimensions();
            self.l = self.canvas.width / self.game.width;
            self.painter.redraw(self.game.shape, self.l);
            self.bottomPainter.redrawShapes(self.game.rows, self.l);

        },

        closeCurtain: function () {
            self.message.innerHTML = "Game Over";
            self.curtain.className = "curtain_closed";
        },

        moveDown: function () {
            self.shiftFallingShape(0, 1);
        },

        drawBottom: function () {
            self.bottomPainter.redrawShapes(self.game.rows, self.l);
        },

        updateScore: function() {
            self.score.innerHTML = self.game.score;
        },

        updateLevel: function() {
            self.level.innerHTML = self.game.getLevel();
        },

        start: function() {
            this.game.run();
            this.curtain.className = "curtain_open";
        }


    };

    return self;
 }) ();
