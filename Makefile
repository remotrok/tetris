test:
	mocha -u qunit --reporter list tests/*.js
	
.PHONY: test
