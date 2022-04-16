import View from './views.js';
import TodoApi from './TodoAPI.js';
export default class App {
  constructor(root) {
    this.root = root;
    this.todos = [];
    this.view = new View(root, this._handlers());
    this._renderTodos();
  }
  _renderTodos() {
    const todos = TodoApi.getTodos();
    this._addTodos(todos);
  }
  _addTodos(todos) {
    this.todos = todos;
    this.view.updateTodoList(todos);
  }
  _handlers() {
    return {
      addTodo: (todo) => {
        const todos = {
          text: todo,
        };
        TodoApi.postTodos(todos);
        this._renderTodos();
      },
    };
  }
}
