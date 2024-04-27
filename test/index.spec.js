var chai = require('chai');
var chaiAsPromised = require("chai-as-promised");
var path = require('path');
var fs = require('fs');
var jsonStreamCombiner = require('../src/index.js')

chai.use(chaiAsPromised);
chai.should();

var input1 = path.join(__dirname, './jsonFiles/input1.json'); 
var input2 = path.join(__dirname, './jsonFiles/input2.json'); 
var output = path.join(__dirname, './jsonFiles/output.json'); 
var expected = path.join(__dirname, './jsonFiles/expectedOutput.json'); 

describe('jsonStreamCombiner', function() {
	it('combine 2 json files to output file', function() {
		var expectedOutput = fs.readFileSync(expected).toString();
		return jsonStreamCombiner([ input1, input2 ], output)
			.then(function() {
				var outputData = fs.readFileSync(output).toString();
				fs.unlinkSync(output);
				return outputData;
			}).should.eventually.equal(expectedOutput);
	});

	it('combine 1 json file and 1 array of json objects to output file', function() {
		var expectedOutput = fs.readFileSync(expected).toString();
		var jsonInput1 = path.join(__dirname, './jsonFiles/jsonInput1.json'); 
		var input1Data = fs.readFileSync(jsonInput1).toString();
		var inputJson1 = JSON.parse(input1Data);

		return jsonStreamCombiner([ inputJson1, input2 ], output)
			.then(function() {
				var outputData = fs.readFileSync(output).toString();
				fs.unlinkSync(output);
				return outputData;
			}).should.eventually.equal(expectedOutput);
	});

	it('combine 1 json object and 1 array of json objects to output file', function() {
		var expectedOutput = fs.readFileSync(expected).toString();
		var jsonInput1 = path.join(__dirname, './jsonFiles/jsonInput1.json'); 
		var input1Data = fs.readFileSync(jsonInput1).toString();
		var inputJson1 = JSON.parse(input1Data);

		var jsonInput2 = path.join(__dirname, './jsonFiles/jsonInput2.json'); 
		var input2Data = fs.readFileSync(jsonInput2).toString();
		var inputJson2 = JSON.parse(input2Data);

		return jsonStreamCombiner([ inputJson1, inputJson2 ], output)
			.then(function() {
				var outputData = fs.readFileSync(output).toString();
				fs.unlinkSync(output);
				return outputData;
			}).should.eventually.equal(expectedOutput);
	});
});
