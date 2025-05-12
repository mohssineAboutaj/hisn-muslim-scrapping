const fs = require('fs');
const { getArg } = require("./global");

let arBook, enBook;

// Read both language files
try {
    arBook = require('./data/full_husn_muslim_ar.json');
    enBook = require('./data/full_husn_muslim_en.json');
    
    if (!Array.isArray(arBook) || !Array.isArray(enBook)) {
        throw new Error('Both input files must contain arrays');
    }
    
    console.log(`Loaded ${arBook.length} Arabic entries and ${enBook.length} English entries`);
} catch (error) {
    console.error('Error loading input files:', error);
    process.exit(1);
}

// Create a map of English entries by ID for easy lookup
const enMap = new Map();
enBook.forEach(item => {
    if (item.ID) {
        enMap.set(item.ID, item);
    }
});

// Merge the data
const mergedBook = arBook
    .filter(arItem => arItem && arItem.ID) // Filter out invalid entries
    .map(arItem => {
        const enItem = enMap.get(arItem.ID);
        if (!enItem) {
            console.log(`Warning: No English translation found for ID ${arItem.ID}`);
            return arItem; // Keep Arabic only if no English translation exists
        }

        return {
            ...arItem,
            TRANSLATED_TITLE: enItem.TITLE,
            children: Array.isArray(arItem.children) 
                ? arItem.children
                    .filter(child => child && child.ID)
                    .map(arChild => {
                        // Find matching child in English version
                        const enChildItem = Array.isArray(enItem.children) 
                            ? enItem.children.find(c => c.ID === arChild.ID)
                            : null;

                        if (!enChildItem) {
                            console.log(`Warning: No English translation found for child ID ${arChild.ID} in parent ${arItem.ID}`);
                            return arChild;
                        }

                        return {
                            ...arChild,
                            TRANSLATED_TEXT: enChildItem.TRANSLATED_TEXT,
                            LANGUAGE_ARABIC_TRANSLATED_TEXT: enChildItem.LANGUAGE_ARABIC_TRANSLATED_TEXT
                        };
                    })
                : [] // If no children array, create empty one
        };
    });

// Write the merged data to a new file
try {
    if (!fs.existsSync('./data')) {
        fs.mkdirSync('./data', { recursive: true });
    }
    
    fs.writeFileSync(
        './data/full_book.json',
        JSON.stringify(mergedBook, null, 2),
        'utf8'
    );
    
    console.log('Merged book created successfully in data/full_book.json');
    console.log(`Total entries in merged book: ${mergedBook.length}`);
} catch (error) {
    console.error('Error writing output file:', error);
    process.exit(1);
}
