import { getCheerioFile } from './utils/cheerio';
import commander from './utils/commander';
import { getCSV } from './utils/csv';
import { getDefinedValues } from './utils/data';
import { unixEpochToString } from './utils/dates';
import { getFilenameWithoutExtension, writeFileAsync } from './utils/fs';

const getTagInfo = tag => {
  const { attribs = {}, data, name, type } = tag;

  const { add_date: addDate, href } = attribs;

  const info = {
    addDate: unixEpochToString(addDate),
    href,
    name: type === 'text' ? 'text' : name
  };

  if (type === 'text') {
    const trimmedText = data.trim();
    if (trimmedText.length > 0) {
      info.text = data;
    }
  }
  return getDefinedValues(info);
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
    const { children: nextChildren } = child;

    const tagInfo = getTagInfo(child);

    if (skipThese.has(tagInfo.name)) {
      return;
    }

    if (tagInfo.name === 'text') {
      if (tagInfo.text) {
        collection.push({ text: tagInfo.text });
        return collection;
      }
      return;
    }

    if (tagInfo.name === 'dt') {
      // somehow, just push the children for this and dl
      // console.log(child.children.map(ch => ch.name));
      // console.log(assembleChildren(nextChildren));
      // console.log("---");
      // return assembleChildren(nextChildren);
      // collection.push(assembleChildren(nextChildren));
    }

    if (assembleText.has(tagInfo.name)) {
      // put text data in the a tag
      return collection.push({
        ...tagInfo,
        text: child.firstChild.data
      });
    }

    return collection.push({
      ...tagInfo,
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
    const { firstChild } = link;
    const title = firstChild ? firstChild.data : '';
    let curPrevSibling = link.parent.parent.previousSibling;
    while (curPrevSibling && curPrevSibling.name !== 'h3') {
      curPrevSibling = curPrevSibling.previousSibling;
    }
    const category =
      curPrevSibling && curPrevSibling.firstChild
        ? curPrevSibling.firstChild.data
        : undefined;

    const { name, ...rest } = getTagInfo(link);
    return { ...rest, title, category };
  });
};

const main = async () => {
  const { input, output } = commander;
  // console.log(input, output);
  // debugger;
  // const infile = paths.firefox;
  const outfile = output || `${getFilenameWithoutExtension(input)}.csv`;
  const $ = await getCheerioFile(input);
  // const allChildren = getAllChildrenFromRootDl($);

  const linkTags = getAllLinkTags($);
  const csv = getCSV(linkTags);

  // output file to disk
  await writeFileAsync(outfile, csv);
};

main();
