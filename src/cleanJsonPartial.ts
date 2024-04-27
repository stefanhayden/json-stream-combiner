export default function cleanJsonPartial(data) {
	const firstCurly = data.indexOf('{');
	const lastCurly = data.lastIndexOf('}')

	return data.substr(firstCurly, lastCurly - firstCurly + 1);
} 
