/*global suite, test, expect,
	ShapeMaker, Shape*/

'use strict';


suite('ShapeMaker');

test('A Shape have an id(string)', function () {
	var shape = ShapeMaker.getRandomShape();
	expect(shape.id).be.an('string');
});

test('A Shape have squares(Array)', function () {
	var shape = ShapeMaker.getRandomShape();
	expect(shape.squares).be.an(Array);
});

test('A Shape id is one of C, Z, L, LI, B, S or T', function () {
	var shape = ShapeMaker.getRandomShape();
	expect(['C', 'Z', 'L', 'LI', 'B', 'S', 'T']).to.contain(shape.id);
});

test('A Shape is formed by 4 squares', function () {
	var shape = ShapeMaker.getRandomShape();
	expect(shape.squares.length).to.be(4);
});
