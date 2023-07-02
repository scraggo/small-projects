const fs = require('fs');
const path = require('path');
const { execSync } = require('node:child_process');

const { dir } = require('./config');

const album = 'kMDItemAlbum';
const authors = 'kMDItemAuthors';
const fileDataCMD = `mdls -name ${album} -name ${authors} -raw`;

const files = fs.readdirSync(dir).filter((file) => file.endsWith('.flac'));

const sep = path.sep;

/**
 * @param {string} file
 */
const getFileData = (file) => {
  const fileData = execSync(`${fileDataCMD} "${dir}${sep}${file}"`);
  const fileDataStr = fileData.toString();
  const [album, authorsRaw] = fileDataStr.split('\x00');
  const authors = authorsRaw
    .split('\n')
    .slice(1, -1)
    .map((_authors) => _authors.trim().slice(1, -1));
  // console.log(album);
  // console.log(authors);
  return {
    album,
    authors,
    track: file,
  };
};

const albums = new Set();

const dataForAllFiles = files.forEach((file) => {
  const { album, authors, track } = getFileData(file);

  const albumPath = `${dir}${sep}${album.replace(/\W/g, '')}`;

  if (!albums.has(albumPath)) {
    const mkdirCMD = `mkdir "${albumPath}"`;
    console.log(mkdirCMD);
    execSync(mkdirCMD);
    albums.add(albumPath);
  }

  const mvCMD = `mv "${dir}${sep}${track}" "${albumPath}${sep}${track}" && echo "moved ${track}";`;
  console.log(mvCMD);
  execSync(mvCMD);
});

// console.log(JSON.stringify(dataForAllFiles, null, 2));
