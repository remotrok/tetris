/*global suite, test, expect,
	Shape*/

'use strict';

suite('Shape');

test('Shape Constructor Makes Copies', function () {
	var template, shape;

	template = {
		id : "C",
        "color" : "#efefef",
        "coords" : [[0, 0], [-1, -1], [-1, 0], [0, -1]]
    };

    shape = new Shape(template);

	shape.id = "koko";
	shape.coords[0][0] = 30;

	expect(shape).to.not.equal(template);
	expect(shape.id).to.not.equal(template.id);
	expect(shape.coords[0][0]).to.not.equal(template.coords[0][0]);
});