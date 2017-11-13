

## 11/12/2017
Progress: was able to wrap my head around deleting children.

The following actually worked:
```js
function attachListItemButtons(f_listUl) { //using js to create HTML buttons
    for (let i = f_listUl.children.length - 1; i >=0; i--) {
    f_listUl.removeChild(f_listUl.children[i]);
    }
```
The goal is to remove ALL buttons at the beginning of the function.

// if li.hasChildren(), remove all children.

make into separate function?
