const { pathExist, insert, getArg, defaultLang } = require('./global');
const lang = getArg('lang') || defaultLang,
			husn = require(`./data/husn_muslim_book_${lang}.json`),
			wget = require('node-wget'),
			uniqWith = require('uniq-with'),
			subAudioDest = "./audio/sub/",
			delay = 3000;

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
		updatedhusn = husn[i]
		await husn[i].children.forEach(async function(subhusn, index) {
			await wget({
				url: subhusn.AUDIO,
				timeout: 1000,
				dest: subAudioDest,
			})
			updatedhusn.children[index].AUDIO_URL = subhusn.AUDIO
			updatedhusn.children[index].AUDIO = './audio/sub/' + subhusn.AUDIO.slice(subhusn.AUDIO.lastIndexOf('/') + 1)
			husnMuslimfullLocalBook.push(updatedhusn)
		});
		i++
	} else {
		clearInterval(reqTimer)
		uniqData = uniqWith((a, b) => a.ID === b.ID, husnMuslimfullLocalBook);
		await insert({
			object: uniqData,
			fileName: `data/full_husn_muslim_${lang}.json`,
		})
		console.log("fetching complete");
	}
}, delay)
