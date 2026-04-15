"use strict";

const form = document.querySelector('.form');
const input = document.querySelector('.input');
const simplyTodo = document.querySelector('.todos');
const buttonCreate = document.querySelector('.button-create');

const todoKeys = {
  id: "id",
  text: "text",
  is_completed: "is_completed",
};

const todos = [];

const errTodoNotFound = todoId => `Todo with id ${todoId} not found`;

const getNewTodoId = todos =>
  todos.reduce((maxId, todo) => Math.max(maxId, todo[todoKeys.id]), 0) + 1;

const createTodo = (todos, text) => {
  const newTodo = {
    [todoKeys.id]: getNewTodoId(todos),
    [todoKeys.text]: text,
    [todoKeys.is_completed]: false,
  };
  todos.push(newTodo);
  return newTodo;
};

const completeTodoById = (todos, todoId) => {
  const todo = todos.find(todo => todo[todoKeys.id] === todoId);

  if (!todo) {
    console.error(errTodoNotFound(todoId));
    return null;
  }
  todo[todoKeys.is_completed] = !todo[todoKeys.is_completed];
  return todo;
};

const deleteTodoById = (todos, todoId) => {
  const todoIndex = todos.findIndex(todo => todo[todoKeys.id] === todoId);
  if (todoIndex === -1) {
    console.error(errTodoNotFound(todoId));
    return todos;
  }
  todos.splice(todoIndex, 1);
  return todos;
};


function createTodoElement(text) {
  const li = document.createElement('li');
  li.className = 'todo';
  
  const todoText = document.createElement('div');
  todoText.className = 'todo-text';
  todoText.textContent = text;
  
  const todoActions = document.createElement('div');
  todoActions.className = 'todo-actions';
  
  const completeBtn = document.createElement('button');
  completeBtn.className = 'button-complete button';
  completeBtn.innerHTML = '&#10004;';
  
  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'button-delete button';
  deleteBtn.innerHTML = '&#10006;';
  
  todoActions.append(completeBtn, deleteBtn);
  li.append(todoText, todoActions);
  
  return li;
};


function handleCreateTodo(todos, text) {
  if (!text) {
    alert('Текст задачи не может быть пустым');
    return null;
  }
  
  const newTodo = createTodo(todos, text);
  
  const todoElement = createTodoElement(newTodo[todoKeys.text]);
  
  return {
    todo: newTodo,
    element: todoElement
  };
};

textInput = input.value

buttonCreate.addEventListener('click', () => {
  handleCreateTodo(getNewTodoId, textInput);
})

// При помощи метода querySelector получаем элементы .form, .input и .todos
// Создаем функцию createTodoElement(text), которая будет создавать todo в виде разметки
// Создаем функцию handleCreateTodo(todos, text), которая будет вызывать createTodo и createTodoElement



