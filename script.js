document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('todo-form');
  const input = document.getElementById('new-item');
  const list = document.getElementById('todo-list');

  const todos = JSON.parse(localStorage.getItem('todos') || '[]');
  todos.forEach(addTodoToDOM);

  form.addEventListener('submit', e => {
    e.preventDefault();
    const text = input.value.trim();
    if (text) {
      const todo = { text, done: false };
      todos.push(todo);
      save();
      addTodoToDOM(todo);
      input.value = '';
    }
  });

  function addTodoToDOM(todo) {
    const li = document.createElement('li');
    li.textContent = todo.text;
    if (todo.done) li.classList.add('done');

    li.addEventListener('click', () => {
      todo.done = !todo.done;
      save();
      li.classList.toggle('done');
    });

    const removeBtn = document.createElement('button');
    removeBtn.textContent = '\u2715';
    removeBtn.className = 'remove';
    removeBtn.addEventListener('click', e => {
      e.stopPropagation();
      const idx = todos.indexOf(todo);
      if (idx > -1) {
        todos.splice(idx, 1);
        save();
        li.remove();
      }
    });

    li.appendChild(removeBtn);
    list.appendChild(li);
  }

  function save() {
    localStorage.setItem('todos', JSON.stringify(todos));
  }
});
