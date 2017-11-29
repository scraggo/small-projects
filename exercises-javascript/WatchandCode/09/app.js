console.log('ToDoList v9 watchandcode.com');

var todoList = {
	todos: [],
  displayTodos: function() {
    // debugger;
    if (this.todos.length === 0) {
      console.log('No todos to display.');
    } else {
      console.log('My todos:');
      for (var i = 0; i < this.todos.length; i++) {
        if (this.todos[i].completed === true) {
          console.log('(x) ' + this.todos[i].todoText);
        } else {
          console.log('( ) ' + this.todos[i].todoText);
        }
      }
    }
  },
  addTodo: function(todoText) {
  	this.todos.push({
    	todoText: todoText,//todoText key has same name parameter name as the input parameter. weird to look at.
      completed: false
    });
    this.displayTodos();
  },
  changeTodo: function(position, todoText) {
  	this.todos[position].todoText = todoText;
    this.displayTodos();
  },
  deleteTodo: function(position) {
  	this.todos.splice(position, 1);
    this.displayTodos();
  },
  toggleCompleted: function(position) {
  	var todo = this.todos[position];
    todo.completed = !todo.completed;
    this.displayTodos();
  },
  toggleAll: function() {
    var totalTodos = this.todos.length;
    var completedTodos = 0;
    
    for (var i = 0; i < totalTodos; i++) {
      if (this.todos[i].completed === true) {
        completedTodos += 1;
      }
    }
     //Case 1: if everything is true, make everything false   
    if (completedTodos === totalTodos) {
      for (var i = 0; i < totalTodos; i++) {
        this.todos[i].completed = false;
      }
    }
     //Case 2: make everything true.
    else {
      for (var i = 0; i < totalTodos; i++) {
        this.todos[i].completed = true;
      }
      
    }
    this.displayTodos();
  }
};

const handlers = {
  displayTodos: function() {
    todoList.displayTodos();
  },
  addTodo: function() {
    let addTodoTextInput = document.getElementById('addTodoTextInput');
    todoList.addTodo(addTodoTextInput.value);
    addTodoTextInput.value = '';
  },
  changeTodo: function() {
    let changeTodoPositionInput = document.getElementById('changeTodoPositionInput');
    let changeTodoTextInput = document.getElementById('changeTodoTextInput');
    todoList.changeTodo(changeTodoPositionInput.valueAsNumber, changeTodoTextInput.value);
    changeTodoPositionInput.value = '';
    changeTodoTextInput.value = '';
  },
  deleteTodo: function() {
    let deleteTodoPositionInput = document.getElementById('deleteTodoPositionInput');
    todoList.deleteTodo(deleteTodoPositionInput.valueAsNumber);
    deleteTodoPositionInput.value = '';
  },
  toggleCompleted: function() {
    let toggleCompletedPositionInput = document.getElementById('toggleCompletedPositionInput');
    todoList.toggleCompleted(toggleCompletedPositionInput.valueAsNumber);
    toggleCompletedPositionInput.value = '';
  },
  toggleAll: function() {
    todoList.toggleAll();
  }
};

const view = {
  displayTodos: function() {
    let todosUl = document.querySelector('ul');
    todosUl.innerHTML = '';
    let todoLi, i;
    for (i = 0; i < todoList.todos.length; i++) {
      todoLi = document.createElement('li');
      // todoLi.innerHTML = todoList.todos[i].todoText; // getting ahead of myself
      todosUl.appendChild(todoLi);
    }
  }
};


function runTests() {
  console.log('=====\nTESTS\n=======')
  todoList.displayTodos();
  todoList.addTodo('item1');
  todoList.addTodo('item2');
  todoList.addTodo('item3');
  todoList.displayTodos();
  todoList.toggleCompleted(0);
  todoList.toggleAll();
  todoList.toggleCompleted(1);
  todoList.toggleAll();
  todoList.toggleCompleted(2);
  todoList.toggleAll();
  todoList.toggleAll();  
}
