var chai = require('chai');
import cleanJsonPartial from '../src/cleanJsonPartial.ts';

var json = {
	a: 1,
	b: 2,
	c: {
		c1: 'hello',
		c2: 2,
	},
	d: 5,
};

var jsonString = JSON.stringify(json, null, 4);

describe('cleanJsonPartial', function() {
	it('should remove commas before the first {', function() {
		var jsonOutput = cleanJsonPartial(',' + jsonString);
		chai.assert.equal(jsonString, jsonOutput);
	});

	it('should remove commas after the last }', function() {
		var jsonOutput = cleanJsonPartial(jsonString + ',');
		chai.assert.equal(jsonString, jsonOutput);
	});

	it('should remove square brackets before the first {', function() {
		var jsonOutput = cleanJsonPartial('[' + jsonString);
		chai.assert.equal(jsonString, jsonOutput);
	});

	it('should remove square brackets after the last }', function() {
		var jsonOutput = cleanJsonPartial(jsonString + ']');
		chai.assert.equal(jsonString, jsonOutput);
	});

	it('should remove commas and sqaure brackets before the first { and the last }', function() {
		var jsonOutput = cleanJsonPartial('[ ,' + jsonString + ', ]');
		chai.assert.equal(jsonString, jsonOutput);
	});

	it('should remove anything before the first { and the last }', function() {
		var jsonOutput = cleanJsonPartial('[ ,' + jsonString + ', ]');
		chai.assert.equal(jsonString, jsonOutput);
	});
});
