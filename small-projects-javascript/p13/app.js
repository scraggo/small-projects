const toggleList = document.getElementById('toggleList');//we could use querySelector instead.
const listDiv = document.querySelector('.list');
const descriptionInput = document.querySelector('input.description');
const descriptionP = document.querySelector('p.description');
const descriptionButton = document.querySelector('button.description');
const listUl = listDiv.querySelector('ul') // this is a way to access child
const addItemInput = document.querySelector('input.addItemInput');
const addItemButton = document.querySelector('button.addItemButton');

function updateDom() {
  // these need to be updated with app states.
  const lis = Array.from(listUl.children); //gets a list of all child elements
  const firstListItem = listUl.firstElementChild;
  const lastListItem = listUl.lastElementChild;
  lis.forEach(i => attachListItemButtons(i)); //they used a for loop without Array.from.
  return [lis, firstListItem, lastListItem];
}

let updates = updateDom();
console.log(updates);

firstListItem.style.backgroundColor = 'blue';
lastListItem.style.backgroundColor = 'red';

function attachListItemButtons(li) { //using js to create HTML buttons
  if (li != firstListItem) {
    let up = document.createElement('button');
    up.className = 'up';
    up.textContent = 'Up';
    li.appendChild(up);
  }

  if (li != lastListItem) {
    let down = document.createElement('button');
    down.className = 'down';
    down.textContent = 'Down';
    li.appendChild(down);
  }

  let remove = document.createElement('button');
  remove.className = 'remove';
  remove.textContent = 'Remove';
  li.appendChild(remove);
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
    attachListItemButtons(li);
    // this clears the input after the new element is appended
    addItemInput.value = '';  // this is not needed if the value is already empty
  }
});

