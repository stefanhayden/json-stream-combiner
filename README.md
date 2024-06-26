Json Stream Combiner
=================

A simple API to stream combine many json files, json objects, or array of json objects into a single output file.

`npm install json-stream-combiner`

If we have this input file:
```json
[
	{ "x": 1, "y": 2 },
	{ "q": 1, "w": 2 }
]
```

We can pass that in like this:

```javascript
import jsonStreamCombiner from 'jsonStreamCombiner';

jsonStreamCombiner([
	'/absolute/path/to/json/input.json',
	{ a: 1, b: 2 },
	[ { c: 1, d: 2 }, { e: 1, d: 2 } ]
], 
'/absolute/path/to/json/output.json').then(function() {
	console.log('Done!');
})
```

and then `output.json` will have this output:

```json
[
	{ "x": 1, "y": 2 },
	{ "q": 1, "w": 2 },
	{ "a": 1, "b": 2 },
	{ "c": 1, "d": 2 }, 
	{ "e": 1, "d": 2 }
]
```
