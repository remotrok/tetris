var draw = function(shape, l) {
	var canvas = document.getElementById("canvas");
	var context = canvas.getContext('2d');	

	context.fillStyle = shape.color;
	//context.fillRect(0,0,20,20);
	for(var i=0; i<shape.coords.length; i++) {
		context.fillRect(shape.xabs + shape.coords[i][0] * l, shape.yabs + shape.coords[i][1] * l, l, l);	
	}
	
	console.log(shape.id);
}


window.onload = function() {

	var shape = ShapeMaker.getRandomShape();

	shape.xabs = 40;
	shape.yabs = 40;

	draw(shape, 20);	
	
	var canvas = document.getElementById("canvas");
	
	canvas.onclick = function() {
		shape.rotate();
		shape.shift(40, 40);
		draw(shape, 20);
	}
	
	
}


