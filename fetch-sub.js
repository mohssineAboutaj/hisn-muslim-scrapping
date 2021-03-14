const { pathExist, insert, getArg, defaultLang } = require("./global");
const lang = getArg("lang") || defaultLang;
const husn = require(`./data/husn_muslim_book_${lang}.json`);
const wget = require("node-wget");
const uniqWith = require("uniq-with");
const subAudioDest = "./audio/sub/";
const delay = 3000;

pathExist(subAudioDest);

let limit;
if (getArg("mode") === "prod") {
  limit = husn.length - 1;
} else {
  limit = 1;
}

let i = 0;
let husnMuslimfullLocalBook = [];

let reqTimer = setInterval(() => {
  if (i <= limit) {
    updatedhusn = husn[i];
    husn[i].children.forEach((subhusn, index) => {
      wget({
        url: subhusn.AUDIO,
        timeout: 1000,
        dest: subAudioDest,
      });
      updatedhusn.children[index].AUDIO_URL = subhusn.AUDIO;
      updatedhusn.children[index].AUDIO =
        "./audio/sub/" +
        subhusn.AUDIO.slice(subhusn.AUDIO.lastIndexOf("/") + 1);
      husnMuslimfullLocalBook.push(updatedhusn);
    });
    i++;
  } else {
    clearInterval(reqTimer);
    uniqData = uniqWith((a, b) => a.ID === b.ID, husnMuslimfullLocalBook);
    insert({
      object: uniqData,
      fileName: `data/full_husn_muslim_${lang}.json`,
    });
    console.log("fetching complete");
  }
}, delay);
