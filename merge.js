const { insert, getArg, defaultLang } = require("./global");
const lang = getArg("lang") || defaultLang;
const husnKey = Object.keys(require(`./data/husn_${lang}.json`))[0];
const husn = require(`./data/husn_${lang}.json`)[husnKey];

const { existsSync } = require(`fs`);

let newhusnBook = [];

if (getArg("mode") === "prod") {
  husn.forEach((el) => {
    let adkar = {};
    adkar.ID = el.ID;

    if (existsSync(`./data/${lang}/${el.ID}.json`)) {
      const subFile = require(`./data/${lang}/${el.ID}.json`);
      adkar.TITLE = el.TITLE;
      adkar.TEXT = el.TEXT;
      adkar.AUDIO_URL = el.AUDIO_URL;
      adkar.AUDIO_LOCAL_URL =
        "./audio/" + el.AUDIO_URL.slice(el.AUDIO_URL.lastIndexOf("/") + 1);
      let subAdkarKey = Object.keys(subFile)[0];
      let subAdkar = subFile[subAdkarKey];
      adkar.children = subAdkar;

      newhusnBook.push(adkar);

      insert({
        fileName: `data/husn_muslim_book_${lang}.json`,
        object: newhusnBook,
      });
    }
  });
} else {
  for (let i = 0; i < 3; i++) {
    let el = husn[i];
    let adkar = {};

    adkar.ID = el.ID;
    if (existsSync(`./data/${lang}/${el.ID}.json`)) {
      const subFile = require(`./data/${lang}/${el.ID}.json`);
      adkar.TITLE = el.TITLE;
      adkar.TEXT = el.TEXT;
      adkar.AUDIO_URL = el.AUDIO_URL;
      adkar.AUDIO_LOCAL_URL =
        "./audio/" + el.AUDIO_URL.slice(el.AUDIO_URL.lastIndexOf("/") + 1);
      let subAdkarKey = Object.keys(subFile)[0];
      let subAdkar = subFile[subAdkarKey];
      adkar.children = subAdkar;

      newhusnBook.push(adkar);

      insert({
        fileName: `data/husn_muslim_book_${lang}.json`,
        object: newhusnBook,
      });
    }
  }
}
