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

## Committing

`git update-index --really-refresh`

> Like `--refresh`, but checks stat information unconditionally, without regard to the "assume unchanged" setting.

[ln - How to link to contents of git repo while switching between branches - Stack Overflow](https://stackoverflow.com/questions/63083128/how-to-link-to-contents-of-git-repo-while-switching-between-branches)

> When git checkout needs to replace a work-tree file, it calls unlink first
