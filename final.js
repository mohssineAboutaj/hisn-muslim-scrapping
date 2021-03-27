const { insert, getArg, defaultLang } = require("./global");
const lang = getArg("lang") || defaultLang;
const husn = require(`./data/after_sub_${lang}.json`);
const { nanoid } = require("nanoid");

husn.map((h) => {
  h._id = nanoid();
  h.children.map((c) => {
    c._id = nanoid();
    c.TITLE = h.TITLE;
  });
  h.count = h.children.length;
});

insert({
  object: husn,
  fileName: `data/full_husn_muslim_${lang}.json`,
  successMsg: `success with: ${husn.length} item`,
});
