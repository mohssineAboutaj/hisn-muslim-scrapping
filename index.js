const { pathExist, insert, main, getArg } = require("./global");
const UserAgent = require("user-agents");
const axios = require("axios");
const dest = "./data/";

if (getArg("mode") === "prod") {
  console.log(
    "The proccessing will take unxpectly long time, please wait until everything done"
  );
} else {
  console.log("The proccessing starting, please wait until everything done");
}

pathExist(dest);

main.forEach((el) => {
  const url = el.LANGUAGE_URL;
  const fileName = dest + url.split("/").pop();

  axios
    .get(url, {
      headers: {
        "User-Agent": new UserAgent().toString(),
      },
    })
    .then(({ data }) => {
      insert({ fileName, object: data });
    })
    .catch((err) => {
      console.log(err);
    });
});
