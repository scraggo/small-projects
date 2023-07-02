# karabiner-source

## Why?

- source control
- easier to add bulk remaps
- documents the process

## How?

Modify source `.js` files as needed.

To output json, run a source `.js` file:

```sh
node source-file.js > source-file.json
```

Add json to appropriate parts of `~/.config/karabiner/karabiner.json`

OR what I've done is

`ln [above source] [this repo]`
