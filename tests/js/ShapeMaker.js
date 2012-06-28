suite('ShapeMaker');

test('ShapeConstructorMakesCopies', function() {
	var shape = ShapeMaker.make(ShapeMaker.tetramins[0]);

	shape.id = "koko";
	shape.coords[0][0] = 30;

	var shape2 = ShapeMaker.make(ShapeMaker.tetramins[0]);

	expect(shape).to.not.equal(shape2);	
	expect(shape.id).to.not.equal(shape2.id);
	expect(shape.coords[0][0]).to.not.equal(shape2.coords[0][0]);
});

test('koko', function() {
	expect(1).to.be.ok();
});

test('popo', function() {
	expect(1).to.not.be.ok();
});

test('koko', function() {
	expect(1).to.be.ok();
});
