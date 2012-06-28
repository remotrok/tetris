'use strict';

suite('ShapeMaker');

test('Shape Constructor Makes Copies', function () {
	var shape, shape2;

	shape = ShapeMaker.make(ShapeMaker.tetramins[0]);

	shape.id = "koko";
	shape.coords[0][0] = 30;

	shape2 = ShapeMaker.make(ShapeMaker.tetramins[0]);

	expect(shape).to.not.equal(shape2);
	expect(shape.id).to.not.equal(shape2.id);
	expect(shape.coords[0][0]).to.not.equal(shape2.coords[0][0]);
});

test('A Shape have an id(string)', function () {
	var shape = ShapeMaker.getRandomShape();
	expect(shape.id).be.an('string');
});

test('A Shape have a color(string)', function () {
	var shape = ShapeMaker.getRandomShape();
	expect(shape.color).be.an('string');
});

test('A Shape have coords(Array)', function () {
	var shape = ShapeMaker.getRandomShape();
	expect(shape.coords).be.an(Array);
});

test('A Shape id is one of C, Z, L, LI, B, S or T', function () {
	var shape = ShapeMaker.getRandomShape();
	expect(['S', 'Z', 'L', 'LI', 'B', 'S', 'T']).to.contain(shape.id);
});

test('A Shape is formed by 4 squares', function () {
	var shape = ShapeMaker.getRandomShape();
	expect(shape.coords.length).to.be(4);
});
