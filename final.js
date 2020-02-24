const book = require('./data/full_husn_muslim_ar.json'),
			uniqWith = require('uniq-with'),
			uniqData = uniqWith((a, b) => a.ID === b.ID, book);

