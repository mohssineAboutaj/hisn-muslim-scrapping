const { insert, getArg, defaultLang } = require('./global');
const lang = getArg('lang') || defaultLang,
			husnKey = Object.keys(require(`./data/husn_${lang}.json`))[0],
			husn = require(`./data/husn_${lang}.json`)[husnKey];

let newhusnBook = []

if (getArg('mode') === "prod") {
	husn.forEach(async function(el) {
		let adkar = {}
	
		adkar.ID = el.ID
		adkar.TITLE = el.TITLE
		adkar.TEXT = el.TEXT
		adkar.AUDIO_URL = el.AUDIO_URL
		adkar.AUDIO_LOCAL_URL = "./audio/" + el.AUDIO_URL.slice(el.AUDIO_URL.lastIndexOf('/') + 1)
		let subAdkarKey = Object.keys(require(`./data/${lang}/${el.ID}.json`))[0]
		let subAdkar = require(`./data/${lang}/${el.ID}.json`)[subAdkarKey]
		adkar.children = subAdkar
	
		newhusnBook.push(adkar)
	
		await insert({
			fileName: `data/husn_muslim_book_${lang}.json`,
			object: newhusnBook,
		})
	})
	
} else {
	for (let i = 0; i < 3; i++) {
		let el = husn[i]
		let adkar = {}

		adkar.ID = el.ID
		adkar.TITLE = el.TITLE
		adkar.TEXT = el.TEXT
		adkar.AUDIO_URL = el.AUDIO_URL
		adkar.AUDIO_LOCAL_URL = "./audio/" + el.AUDIO_URL.slice(el.AUDIO_URL.lastIndexOf('/') + 1)
		let subAdkarKey = Object.keys(require(`./data/${lang}/${el.ID}.json`))[0]
		let subAdkar = require(`./data/${lang}/${el.ID}.json`)[subAdkarKey]
		adkar.children = subAdkar

		newhusnBook.push(adkar)

		insert({
			fileName: `data/husn_muslim_book_${lang}.json`,
			object: newhusnBook,
		})
	}
}
