export default class Views {
  constructor(root, { addTodo } = {}) {
    console.log('hello');
    this.root = root;
    this.addTodo = addTodo;
    this.root.innerHTML = `
     <h1>To-Do List <i class="fa fa-plus add"></i></h1>
      <input type="text" id="text" placeholder="Add New Todo" />
       <ul class="todo__list">
       </ul>
    </div>
    `;
    const addBtn = this.root.querySelector('.add');
    const inpValue = this.root.querySelector('#text');

    addBtn.addEventListener('click', () => {
      console.log(inpValue.value);
      this.addTodo(inpValue.value);
      inpValue.value = '';
    });
  }

  _createTodoListHTML(id, text, date) {
    return `
   <div class="todo__container">
    <li class="todo__list-item" data-todo-id="${id}"><span><i class='fa fa-trash'></i></span> ${text}</li>
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
  }
}
