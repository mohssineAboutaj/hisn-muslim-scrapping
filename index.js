const main = require('./main.json').MAIN,
			wget = require('node-wget'),
			dest = "./data/",
			{ pathExist } = require('./global');

pathExist(dest)

main.forEach(async function(el) {
	let url = el.LANGUAGE_URL;
	await wget({
		url,
		dest,
		timeout: 1000,
	})
});
