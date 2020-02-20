const writeJson = require('write-json'),
			{ mkdir } = require('fs'),
			argv = require('argv');

/**
 * @function pathExist a custom function to check & create the parent directory if not exists
 * @module fs
 * @param {string} filePath the file with related or absolute path
 * @param {string} callback callback to execute after the check & parent directory maked
 */
function pathExist(filePath, callback = "") {
	let dest = filePath.slice(0, filePath.lastIndexOf('/'));

	return mkdir(dest, {
		recursive: true
	}, (err) => {
		if (err) {
			console.log(err)
		} else {
			if (callback) {
				callback()
			}
		}
	})
}

module.exports = {
	// default language
	defaultLang: "ar",
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
	insert: function({fileName, object, successMsg = "inserted successfully"}) {
		pathExist(fileName, () => {
			writeJson(fileName, object, (err) => {
				if (err) {
					console.log(err)
				} else {
					console.log(successMsg)
				}
			})
		})
	},
	pathExist,
	getArg: function(name) {
		let listOfArgs = {}
		argv.run().targets.forEach(arg => {
			arg = arg.split('=')
			listOfArgs[arg[0]] = arg[1]
		})
		return listOfArgs[name]
	},
}

