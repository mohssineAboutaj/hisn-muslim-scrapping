const { insert, getArg, defaultLang } = require("./global");
const lang = getArg("lang") || defaultLang;
const husn = require(`./data/after_sub_${lang}.json`);
const { nanoid } = require("nanoid");

// Validate a child object has all required fields
const isValidChild = (child) => {
  const requiredFields = ["ID", "ARABIC_TEXT", "AUDIO_URL"];
  return requiredFields.every((field) => {
    const hasField = child[field] !== undefined && child[field] !== null;
    if (!hasField) {
      console.log(
        `Warning: Child with ID ${child.ID || "unknown"} is missing ${field}`
      );
    }
    return hasField;
  });
};

// Validate parent object has all required fields and valid children
const isValidParent = (parent) => {
  const requiredFields = ["ID", "TITLE", "TEXT", "AUDIO_URL", "children"];
  const hasAllFields = requiredFields.every((field) => {
    const hasField = parent[field] !== undefined && parent[field] !== null;
    if (!hasField) {
      console.log(
        `Warning: Parent with ID ${parent.ID || "unknown"} is missing ${field}`
      );
    }
    return hasField;
  });

  if (!hasAllFields) return false;

  // Filter out invalid children
  parent.children = parent.children.filter(isValidChild);

  // Only keep parents with at least one valid child
  return parent.children.length > 0;
};

// Filter out invalid entries and map remaining ones
const validHusn = husn.filter(isValidParent).map((h) => {
  h._id = nanoid();
  h.children = h.children.map((c) => {
    c._id = nanoid();
    c.TITLE = h.TITLE;
    return c;
  });
  h.count = h.children.length;
  return h;
});

const removedCount = husn.length - validHusn.length;
console.log(`Removed ${removedCount} invalid entries`);
console.log(`Proceeding with ${validHusn.length} valid entries`);

insert({
  object: validHusn,
  fileName: `data/full_husn_muslim_${lang}.json`,
  successMsg: `success with: ${validHusn.length} items`,
});
