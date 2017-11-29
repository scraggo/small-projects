```js
function runWithDebugger(func) {
  debugger;
  func();
}
```

setTimeout(func, timeOut)

forEach

## addEventListener
**You can use `$0` as a reference to whatever DOM element is selected (in Chrome)**

```js
// Console
$0
<h2>​…​</h2>​
let hi = $0
undefined
hi
<h2>​…​</h2>​

hi.addEventListener('click', function(event) {
  console.log(event);// <- gold right here
  console.log('clicked');
})
```

## Higher Order functions
- functions that accept other functions
- enchance the behavior of other functions

## Callback functions
- functions that are passed into higher order functions

example: the 'blue' higher order function takes the 'pink' callback function as a parameter