Public copies from my personal notes collection.

## Add notes

```sh
cd path-to-this-directory

./link.sh # follow prompt

# commit and push!
```

The `link.sh` script is effectively doing this:

```sh
# `ln` creates a "hard" link that changes with source changes
ln file-from-personal-notes.md ./file-from-personal-notes.md
```
