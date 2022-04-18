export default class TodoAPI {
  static getTodos() {
    const todos = JSON.parse(localStorage.getItem('todos') || '[]');
    return todos.sort(function (a, b) {
      return new Date(b.date) - new Date(a.date);
    });
  }
  static postTodos(updateTodos) {
    const todos = TodoAPI.getTodos();
    const todo = todos.find((todo) => todo.id == updateTodos.id);

    if (todo) {
      todo.text = updateTodos.text;
      todo.date = new Date();
    } else {
      updateTodos.id = Math.floor(Math.random() * 1000000);
      updateTodos.date = new Date();
      todos.push(updateTodos);
    }
    localStorage.setItem('todos', JSON.stringify(todos));
  }
  static getTodo(todoItem) {
    const todos = TodoAPI.getTodos();
    const todo = todos.find((todo) => todo.id == todoItem.id);

    return todo;
  }
  static deleteTodos(id) {
    const todos = TodoAPI.getTodos();
    const todo = todos.filter((todo) => todo.id != id);
    localStorage.setItem('todos', JSON.stringify(todo));
  }
}
