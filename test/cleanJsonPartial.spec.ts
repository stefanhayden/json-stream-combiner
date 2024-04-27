import { describe, expect, test } from '@jest/globals';
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
	test('should remove commas before the first {', function() {
		var jsonOutput = cleanJsonPartial(',' + jsonString);
		expect(jsonString).toMatch(jsonOutput)
	});

	test('should remove commas after the last }', function() {
		var jsonOutput = cleanJsonPartial(jsonString + ',');
		expect(jsonString).toMatch(jsonOutput)
	});

	test('should remove square brackets before the first {', function() {
		var jsonOutput = cleanJsonPartial('[' + jsonString);
		expect(jsonString).toMatch(jsonOutput)
	});

	test('should remove square brackets after the last }', function() {
		var jsonOutput = cleanJsonPartial(jsonString + ']');
		expect(jsonString).toMatch(jsonOutput)
	});

	test('should remove commas and sqaure brackets before the first { and the last }', function() {
		var jsonOutput = cleanJsonPartial('[ ,' + jsonString + ', ]');
		expect(jsonString).toMatch(jsonOutput)
	});

	test('should remove anything before the first { and the last }', function() {
		var jsonOutput = cleanJsonPartial('[ ,' + jsonString + ', ]');
		expect(jsonString).toMatch(jsonOutput)
	});
});
