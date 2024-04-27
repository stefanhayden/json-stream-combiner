const fs = require('fs');
import { transform } from 'stream-transform';
import JSONStream from 'JSONStream';
import streamify from 'stream-array';
const cleanJsonPartial = require('./cleanJsonPartial');

type FilesInput = (string | { [key: string | number]: any } | { [key: string | number]: any }[])[]

export default function jsonStreamCombiner(files: FilesInput, destinationFile: string) {

	var p = Promise.resolve();
	var isFirstCall = true;

	files.forEach(function (file, fileIndex) {
		p = p.then(function () {
			return new Promise(function (resolve, reject) {
				var transformer = transform({ parallel: 1 }, function (data, cb) {
					if (typeof data !== 'string') {
						data = JSON.stringify(data, null, 4);
					}

					data = cleanJsonPartial(data);
					data = JSON.parse('[' + data + ']');

					if (data.length > 0) {
						data = JSON.stringify(data, null, 4);
						data = cleanJsonPartial(data);

						if (isFirstCall) {
							data = data;
							isFirstCall = false;
						} else {
							data = '\n,' + data;
						}
					} else {
						data = '';
					}

					cb(null, data);
				});

				var ws;
				if (fileIndex === 0) {
					ws = fs.createWriteStream(destinationFile, { flags: 'w' });
					ws.write('[\n');
				} else {
					ws = fs.createWriteStream(destinationFile, { flags: 'a' });
				}

				ws.on('error', function (err) {
					throw err;
				});

				var rs;
				if (file instanceof Object) {
					file = [file];
				}

				if (Array.isArray(file)) {
					rs = streamify(file);

					rs
						.pipe(JSONStream.stringify())
						.pipe(transformer)
						.pipe(ws);
				} else {
					rs = fs.createReadStream(file);
					rs.setEncoding('utf8');

					rs
						.pipe(JSONStream.parse())
						.pipe(transformer)
						.pipe(ws);
				}

				rs.on('end', () => {
					ws.on('finish', () => {
						resolve();
					});

					if (fileIndex === files.length - 1) {
						ws.end('\n]');
					} else {
						ws.end();
					}
				});
			});
		});
	});

	return p;
}

