const { pathExist, insert, getArg, defaultLang } = require('./global');
const lang = getArg('lang') || defaultLang,
			husn = require(`./data/husn_muslim_book_${lang}.json`),
			wget = require('node-wget'),
			subAudioDest = "./audio/sub/",
			delay = 1000;

pathExist(subAudioDest)

let limit;
if (getArg('mode') === "prod") {
	limit = husn.length - 1
} else {
	limit = 1
}

let i = 0
let husnMuslimfullLocalBook = []

let reqTimer = setInterval(async function() {
	if (i <= limit) {
		updatedHusn = husn[i]
		husn[i].children.forEach(async function(subHusn, index) {
			await wget({
				url: subHusn.AUDIO,
				timeout: 1000,
				dest: subAudioDest,
			})
			updatedHusn.children[index].AUDIO = './audio/sub/' + subHusn.AUDIO.slice(subHusn.AUDIO.lastIndexOf('/') + 1)
			husnMuslimfullLocalBook.push(updatedHusn)
		});
		i++
	} else {
		clearInterval(reqTimer)
		insert({
			object: husnMuslimfullLocalBook,
			fileName: `data/full_husn_muslim_${lang}.json`,
		})
		console.log("fetching complete");
	}
}, delay)
