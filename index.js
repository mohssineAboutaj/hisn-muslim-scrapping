const main = require('./main.json').MAIN,
			wget = require('node-wget'),
			dest = "./data/",
			{ pathExist } = require('./global');

console.log("The proccessing will take some time over than 5 minute, please wait until everything done");

pathExist(dest)

main.forEach(async function(el) {
	let url = el.LANGUAGE_URL;
	await wget({
		url,
		dest,
		timeout: 1000,
	})
});
