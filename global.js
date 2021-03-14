const writeJson = require("write-json");
const { mkdir } = require("fs");
const argv = require("argv");

// default language
const defaultLang = "ar";

// API base
const baseURL = "https://www.hisnmuslim.com/api/";
const main = [
  {
    ID: 1,
    LANGUAGE: "العربية",
    LANGUAGE_URL: baseURL + "ar/husn_ar.json",
  },
  {
    ID: 2,
    LANGUAGE: "English",
    LANGUAGE_URL: baseURL + "en/husn_en.json",
  },
];

/**
 * @function pathExist a custom function to check & create the parent directory if not exists
 *
 * @module fs
 *
 * @param {string} filePath the file with related or absolute path
 * @param {string} callback callback to execute after the check & parent directory maked
 */
function pathExist(filePath, callback = "") {
  let dest = filePath.slice(0, filePath.lastIndexOf("/"));

  return mkdir(
    dest,
    {
      recursive: true,
    },
    (err) => {
      if (err) {
        console.log(err);
      } else {
        if (callback) {
          callback();
        }
      }
    }
  );
}

/**
 * @function insert a function to create & fill json files
 *
 * @module writeJson
 * @module pathExist
 *
 * @param {string} fileName file name with or without path
 * @param {object} object data to inject into the file
 * @param {string} successMsg !optional: the success message
 *
 */
function insert({ fileName, object, successMsg = "inserted successfully" }) {
  pathExist(fileName, () => {
    writeJson(fileName, object, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log(successMsg);
      }
    });
  });
}

/**
 * @function getArg get the passed argument in cli
 *
 * @module argv
 *
 * @param {string} name
 */
function getArg(name) {
  let listOfArgs = {};
  argv.run().targets.forEach((arg) => {
    arg = arg.split("=");
    listOfArgs[arg[0]] = arg[1];
  });
  return listOfArgs[name];
}

// exports
module.exports = {
  defaultLang,
  main,
  insert,
  pathExist,
  getArg,
};
