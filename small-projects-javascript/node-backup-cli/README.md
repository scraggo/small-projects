# node-backup-cli

Simple script to copy files to a backup directory.

## Usage

`npm start -- -c <path to config.json>`

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
