# bookmarks_to_csv

Goal

- simply export bookmarks html file from Chrome or Firefox
- translate to CSV for use in Google Sheets

Caveats

- Firefox mobile links aren't included. They must be manually copied to another folder before exporting.

## Usage

`npm run build` to transpile the script.

### From package root

`npm start -- -c <path to config.json>`

### From anywhere

`node PATH/TO/SCRIPT/build/index.js -c <path to config.json>`

### Developing

`npm run start-dev` run once

`npm run start-watch` watch mode

## Configuration File

List the files as an array and backupDirectory in a .json config file:

```json
{
  "files": ["~/path/to/foo.txt", "~/different/path/to/bar.txt"],
  "backupDirectory": "/another/path/to/backups"
}
```

`'~'` is allowed as first character to designate HOME directory. Otherwise, all paths must be absolute.

`backupDirectory` must exist. It won't be created for you.

## Credit

Started with [node-cli-scaffold](https://github.com/williscool/node-cli-scaffold)
