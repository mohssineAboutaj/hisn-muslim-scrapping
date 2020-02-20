const { pathExist, getArg, defaultLang } = require('./global');
const lang = getArg('lang') || defaultLang,
			husnKey = Object.keys(require(`./data/husn_${lang}.json`))[0],
			husn = require(`./data/husn_${lang}.json`)[husnKey],
			wget = require('node-wget'),
			dest = `./data/${lang}/`,
			audioDest = "./audio/",
			delay = 1000;

pathExist(dest)
pathExist(audioDest)

let limit;
if (getArg('mode') === "prod") {
	limit = husn.length - 1
} else {
	limit = 3
}

let i = 0

let reqTimer = setInterval(async function() {
	if (i <= limit) {
		await wget({
			url: husn[i].TEXT,
			timeout: 1000,
			dest,
		})
		await wget({
			url: husn[i].AUDIO_URL,
			timeout: 1000,
			dest: audioDest,
		})
		i++
	} else {
		clearInterval(reqTimer)
		console.log("fetching complete");
	}
}, delay)
