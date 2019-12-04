"use strict";

var _cheerio = require("./utils/cheerio");

var _commander = _interopRequireDefault(require("./utils/commander"));

var _csv = require("./utils/csv");

var _data = require("./utils/data");

var _dates = require("./utils/dates");

var _fs = require("./utils/fs");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import { prettyPrint } from './utils/logging';
// paths will eventually be cli argument
const paths = {
  chrome: '/Users/davecohen/Dropbox/Notes/Programming-DB/_BookmarkProject/json_to_spreadsheet/Chrome-191201b.html',
  firefox: '/Users/davecohen/Dropbox/Notes/Programming-DB/_BookmarkProject/json_to_spreadsheet/firefox-bookmarks-191204.html'
};

const getTagInfo = tag => {
  const {
    attribs = {},
    data,
    name,
    type
  } = tag;
  const {
    add_date: addDate,
    href
  } = attribs;
  const info = {
    addDate: (0, _dates.unixEpochToString)(addDate),
    href,
    name: type === 'text' ? 'text' : name
  };

  if (type === 'text') {
    const trimmedText = data.trim();

    if (trimmedText.length > 0) {
      info.text = data;
    }
  }

  return (0, _data.getDefinedValues)(info);
};

const assembleChildren = children => {
  if (!Array.isArray(children)) {
    return [];
  }

  const skipThese = new Set(['hr', 'p']);
  const assembleText = new Set(['h3', 'a']);
  const collection = [];
  children.forEach(child => {
    /* eslint-disable consistent-return */
    const {
      children: nextChildren
    } = child;
    const tagInfo = getTagInfo(child);

    if (skipThese.has(tagInfo.name)) {
      return;
    }

    if (tagInfo.name === 'text') {
      if (tagInfo.text) {
        collection.push({
          text: tagInfo.text
        });
        return collection;
      }

      return;
    }

    if (tagInfo.name === 'dt') {// somehow, just push the children for this and dl
      // console.log(child.children.map(ch => ch.name));
      // console.log(assembleChildren(nextChildren));
      // console.log("---");
      // return assembleChildren(nextChildren);
      // collection.push(assembleChildren(nextChildren));
    }

    if (assembleText.has(tagInfo.name)) {
      // put text data in the a tag
      return collection.push({ ...tagInfo,
        text: child.firstChild.data
      });
    }

    return collection.push({ ...tagInfo,
      children: assembleChildren(nextChildren)
    });
    /* eslint-enable consistent-return */
  });
  return collection;
};

const getAllChildrenFromRootDl = doc => {
  const $ = doc;
  const rootDl = $('dl')[0];
  return assembleChildren(rootDl.children);
};

const getAllLinkTags = doc => {
  const $ = doc;
  const linkTags = $('a');
  return Array.from(linkTags).map(link => {
    const {
      firstChild
    } = link;
    const title = firstChild ? firstChild.data : '';
    let curPrevSibling = link.parent.parent.previousSibling;

    while (curPrevSibling && curPrevSibling.name !== 'h3') {
      curPrevSibling = curPrevSibling.previousSibling;
    }

    const category = curPrevSibling && curPrevSibling.firstChild ? curPrevSibling.firstChild.data : undefined;
    const {
      name,
      ...rest
    } = getTagInfo(link);
    return { ...rest,
      title,
      category
    };
  });
};

const main = async () => {
  const {
    input,
    output
  } = _commander.default;
  console.log(input, output); // debugger;
  // const infile = paths.firefox;

  const outfile = output || `${(0, _fs.getFilenameWithoutExtension)(input)}.csv`;
  const $ = await (0, _cheerio.getCheerioFile)(input); // const allChildren = getAllChildrenFromRootDl($);

  const linkTags = getAllLinkTags($);
  const csv = (0, _csv.getCSV)(linkTags); // output file to disk!

  await (0, _fs.writeFileAsync)(outfile, csv);
};

main();