export default class Views {
  constructor(root, { addTodo, deleteTodo, editTodo, activeTodo } = {}) {
    this.root = root;
    this.addTodo = addTodo;
    this.deleteTodo = deleteTodo;
    this.activeTodo = activeTodo;
    this.editTodo = editTodo;
    this.editMode = false;
    this.root.innerHTML = `
     <h1>To-Do List <i class="fa fa-plus"></i></h1>
      <input type="text" id="text" autocomplete="off" placeholder="Add New Todo" />
       <ul class="todo__list">
       </ul>
    </div>
    `;
    const plusBtn = this.root.querySelector('.fa-plus');

    const inpValue = this.root.querySelector('#text');
    plusBtn.addEventListener('click', () => {
      plusBtn.classList.add('add');
      if (plusBtn.classList.contains('add') && !this.editMode) {
        this.addTodo(inpValue.value);
      } else if (plusBtn.classList.contains('edit') && this.editMode) {
        this.editTodo(inpValue.value);
        plusBtn.classList.remove('edit');
        this.editMode = false;
      }
      inpValue.value = '';
    });
  }

  _createTodoListHTML(id, text, date) {
    return `
   <div class="todo__container" data-todo-id="${id}">
    <li class="todo__list-item"><span><i class='fa fa-trash delete'></i></span><span><i class='fa fa-pencil edit'></i></span>${text}</li>
     <div class="todo__list-date">${date.toLocaleString(undefined, {
       dateStyle: 'full',
       timeStyle: 'short',
     })}
    </div> 
  </div>
  
`;
  }
  updateTodoList(todos) {
    const todoList = this.root.querySelector('.todo__list');
    todoList.innerHTML = '';
    for (const todo of todos) {
      const html = this._createTodoListHTML(
        todo.id,
        todo.text,
        new Date(todo.date)
      );

      todoList.insertAdjacentHTML('beforeend', html);
    }
    todoList.querySelectorAll('.todo__container').forEach((todoItem) => {
      const deleteBtn = todoItem.children[0].children[0];
      deleteBtn.addEventListener('click', () => {
        this.deleteTodo(todoItem.dataset.todoId);
      });
      const inpValue = this.root.querySelector('#text');
      const plusBtn = this.root.querySelector('.fa-plus');
      const editBtn = todoItem.children[0].children[1];
      const inputValue = todoItem.children[0].childNodes[2];

      editBtn.addEventListener('click', () => {
        inpValue.value = inputValue.data;
        this.editMode = true;
        this.activeTodo(todoItem.dataset.todoId);
        plusBtn.classList.remove('add');
        plusBtn.classList.add('edit');
      });
    });
  }
}
