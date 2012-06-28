/*global suite, test, expect,
	ShapeMaker, Shape*/

'use strict';


suite('ShapeMaker');

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
