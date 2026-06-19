// todo.js - simple To-Do app with localStorage
const STORAGE_KEY = 'goodnews_todos_v1';

const todoForm = document.getElementById('todoForm');
const newTodoInput = document.getElementById('newTodo');
const todoList = document.getElementById('todoList');
const clearCompletedBtn = document.getElementById('clearCompleted');
const filterButtons = document.querySelectorAll('.filters button');

let todos = []; // {id, text, completed}
let filter = 'all';

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    todos = raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('로컬 저장소에서 불러오기 실패', e);
    todos = [];
  }
}

function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2,8);
}

function addTodo(text) {
  const t = text && text.trim();
  if (!t) return;
  todos.unshift({ id: uid(), text: t, completed: false });
  save();
  render();
}

function toggleComplete(id) {
  const it = todos.find(x=>x.id===id);
  if (it) it.completed = !it.completed;
  save(); render();
}

function removeTodo(id) {
  todos = todos.filter(x=>x.id!==id);
  save(); render();
}

function editTodo(id, newText) {
  const it = todos.find(x=>x.id===id);
  if (it) { it.text = newText.trim(); save(); render(); }
}

function clearCompleted() {
  todos = todos.filter(x=>!x.completed);
  save(); render();
}

function setFilter(f) {
  filter = f; document.querySelectorAll('.filters button').forEach(b=>b.classList.toggle('active', b.dataset.filter===f)); render();
}

function filteredTodos() {
  if (filter === 'active') return todos.filter(t=>!t.completed);
  if (filter === 'completed') return todos.filter(t=>t.completed);
  return todos;
}

function createListItem(todo) {
  const li = document.createElement('li');
  li.className = 'todo-item' + (todo.completed ? ' completed' : '');
  li.dataset.id = todo.id;

  const chk = document.createElement('input');
  chk.type = 'checkbox';
  chk.checked = !!todo.completed;
  chk.addEventListener('change', ()=> toggleComplete(todo.id));

  const text = document.createElement('div');
  text.className = 'text';
  text.textContent = todo.text;
  text.title = '더블클릭하여 편집';
  text.addEventListener('dblclick', ()=> startEditing(text, todo.id));

  const actions = document.createElement('div');
  actions.className = 'actions';

  const editBtn = document.createElement('button');
  editBtn.className = 'icon-btn';
  editBtn.title = '편집';
  editBtn.textContent = '✏️';
  editBtn.addEventListener('click', ()=> startEditing(text, todo.id));

  const delBtn = document.createElement('button');
  delBtn.className = 'icon-btn';
  delBtn.title = '삭제';
  delBtn.textContent = '🗑️';
  delBtn.addEventListener('click', ()=> removeTodo(todo.id));

  actions.appendChild(editBtn);
  actions.appendChild(delBtn);

  li.appendChild(chk);
  li.appendChild(text);
  li.appendChild(actions);
  return li;
}

function startEditing(textNode, id) {
  const input = document.createElement('input');
  input.type = 'text';
  input.value = textNode.textContent;
  input.className = 'edit-input';
  input.style.width = '100%';
  textNode.replaceWith(input);
  input.focus();
  input.select();
  const finish = ()=>{
    const v = input.value.trim();
    if (v) editTodo(id, v);
    else removeTodo(id);
  };
  input.addEventListener('blur', finish, {once:true});
  input.addEventListener('keydown', (e)=>{
    if (e.key === 'Enter') { input.blur(); }
    if (e.key === 'Escape') { render(); }
  });
}

function render() {
  todoList.innerHTML = '';
  const items = filteredTodos();
  if (items.length === 0) {
    const empty = document.createElement('li');
    empty.className = 'todo-item';
    empty.textContent = '항목이 없습니다.';
    todoList.appendChild(empty);
    return;
  }
  items.forEach(t=> todoList.appendChild(createListItem(t)));
}

// Events
todoForm.addEventListener('submit', (e)=>{
  e.preventDefault();
  addTodo(newTodoInput.value);
  newTodoInput.value = '';
  newTodoInput.focus();
});

clearCompletedBtn.addEventListener('click', (e)=>{ e.preventDefault(); clearCompleted(); });
filterButtons.forEach(b=> b.addEventListener('click', ()=> setFilter(b.dataset.filter)));

// init
load(); render();

// Expose for debugging in console
window._todos = todos;
