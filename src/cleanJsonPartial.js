module.exports =function(data) {
	var firstCurly = data.indexOf('{');
	var lastCurly = data.lastIndexOf('}');

	return data.substr(firstCurly, lastCurly - firstCurly + 1);
} 
