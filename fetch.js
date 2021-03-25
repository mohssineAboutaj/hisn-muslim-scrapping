const UserAgent = require("user-agents");
const axios = require("axios");

const { pathExist, getArg, defaultLang, insert } = require("./global");

const lang = getArg("lang") || defaultLang;
const husnKey = Object.keys(require(`./data/husn_${lang}.json`))[0];
const husn = require(`./data/husn_${lang}.json`)[husnKey];
const wget = require("node-wget");
const dest = `./data/${lang}/`;
const audioDest = "./audio/";
const delay = 3000;

pathExist(dest);
pathExist(audioDest);

let limit;
if (getArg("mode") === "prod") {
  limit = husn.length - 1;
} else {
  limit = 3;
}

let i = 0;

let reqTimer = setInterval(async () => {
  if (i <= limit) {
    const url = husn[i].TEXT;
    const fileName = dest + url.split("/").pop();

    await axios
      .get(url, {
        headers: {
          "User-Agent": new UserAgent().toString(),
        },
      })
      .then(({ data }) => {
        insert({ fileName, object: data });
        wget({ url, timeout: delay, dest: audioDest });

        i++;
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    clearInterval(reqTimer);
    console.log("fetching complete");
  }
}, delay);
