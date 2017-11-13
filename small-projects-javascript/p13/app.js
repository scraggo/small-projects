const toggleList = document.getElementById('toggleList');//we could use querySelector instead.
const listDiv = document.querySelector('.list');
const descriptionInput = document.querySelector('input.description');
const descriptionP = document.querySelector('p.description');
const descriptionButton = document.querySelector('button.description');
const listUl = listDiv.querySelector('ul') // this is a way to access child
const addItemInput = document.querySelector('input.addItemInput');
const addItemButton = document.querySelector('button.addItemButton');

function onLoad(){
  attachListItemButtons();
  // attachListItemButtons();
}

onLoad();

// function getListElements() {
//   return listUl;
// }

function attachListItemButtons() { //using js to create HTML buttons
  // let buttons = f_listUl.getElementsByTagName('button');
  // console.log(f_listUl.children);
  let liArray = listUl.children;
  let i = 0;
  let lastIndex = liArray.length - 1;
  let li, up, down, remove;
  for (i; i < liArray.length; i++) {
    li = liArray[i];
    up = li.querySelector('button.up');
    down = li.querySelector('button.down');
    remove = li.querySelector('button.remove');
    removeButton(li, up);
    removeButton(li, down);
    removeButton(li, remove);

    if (i !== 0) {
      li.appendChild(createUpButton());
    }
    if (i !== lastIndex) {
      li.appendChild(createDownButton());
    }
    li.appendChild(createRemoveButton());
    // console.log(li);
  }
}

function removeButton(li, button) {
  if (button) {
    li.removeChild(button);
  }
}

function createUpButton() {
  let up = document.createElement('button');
  up.className = 'up';
  up.textContent = 'Up';
  return up;
}

function createDownButton() {
  let down = document.createElement('button');
  down.className = 'down';
  down.textContent = 'Down';
  return down;
}

function createRemoveButton() {
  let remove = document.createElement('button');
  remove.className = 'remove';
  remove.textContent = 'Remove';
  return remove;
}

listUl.addEventListener('click', (event) => {
  if (event.target.tagName == 'BUTTON') {
    if (event.target.className == 'remove') {
      let li = event.target.parentNode; //DOM traversal
      let ul = li.parentNode;
      ul.removeChild(li);
    }
    if (event.target.className == 'up') {
      let li = event.target.parentNode; //DOM traversal
      let prevLi = li.previousElementSibling; //DOM traversal
      let ul = li.parentNode;
      if (prevLi) { // if prevLi !== null
        ul.insertBefore(li, prevLi); //write to DOM
      }
    }
    if (event.target.className == 'down') {
      let li = event.target.parentNode; //DOM traversal
      let nextLi = li.nextElementSibling; //DOM traversal
      let ul = li.parentNode;
      if (nextLi) {// if nextLi !== null
        ul.insertBefore(nextLi, li); //write to DOM
      }
    }
  }
  attachListItemButtons();
});



toggleList.addEventListener('click', () => {
  if (listDiv.style.display == 'none') {
    toggleList.textContent = 'Hide list';
    listDiv.style.display = 'block';
  } else {
    toggleList.textContent = 'Show list';
    listDiv.style.display = 'none';
  }
});

descriptionButton.addEventListener('click', () => {
  descriptionP.innerHTML = descriptionInput.value + ':';
  descriptionInput.value = '';
});


addItemButton.addEventListener('click', () => {
  if (addItemInput.value.length > 0) {
    let ul = document.getElementsByTagName('ul')[0];  // used only to add a new element
    let li = document.createElement('li');  // only create the element if it will be added
    li.textContent = addItemInput.value;
    ul.appendChild(li);
    attachListItemButtons();
    // this clears the input after the new element is appended
    addItemInput.value = '';  // this is not needed if the value is already empty
  }
});

