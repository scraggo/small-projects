/* eslint-disable */

// use cheerio https://www.npmjs.com/package/cheerio
// get all a tags? what about the titles of folders they're in?
// recursive call, I think
// if python, use beatiful shoup

const paths = {
  chrome:
    '/Users/davecohen/Dropbox/Notes/Programming-DB/_BookmarkProject/json_to_spreadsheet/Chrome-191201b.html',
  firefox:
    '/Users/davecohen/Dropbox/Notes/Programming-DB/_BookmarkProject/json_to_spreadsheet/firefox-bookmarks-191204.html'
};


const unixEpochToString = date => new Date(date * 1000).toISOString().slice(0, 10);

document.querySelectorAll('a').forEach(node => {
  const dateProp = node.getAttribute('add_date');
  const date = unixEpochToString(dateProp);
  // console.log(date);
  // console.log(new Date(dateProp).toLocaleDateString());
  // console.log(new Date(dateProp));
});

console.log(unixEpochToString('1532787828'));

// const aTags = $("a");
// aTags.each((idx, tag) => {
//   console.log(getTagInfo(tag));
//   console.log(tag);
// });

// const h3tags = $("h3");
// h3tags.each((idx, tag) => {
//   console.log(tag);
//   const tagInfo = getTagInfo(tag);
//   // console.log(tagInfo);
//   const { text } = tagInfo;
//   if (text === "Mobile Bookmarks") {
//     // find all a tags
//     console.log(tag);
//   }
// });

const getTagInfo = tag => {
  const { attribs, data, name, type } = tag;

  const info = {
    name
  };
  if (attribs) {
    const { add_date: addDate, href } = attribs;
    if (addDate) {
      info.addDate = unixEpochToString(addDate);
    }
    if (name === 'a') {
      info.href = href;
    }
  }
  if (type === 'text') {
    info.name = 'text';
    const trimmedText = data.trim();
    if (trimmedText.length > 0) {
      info.text = data;
    }
  }
  return info;
};
