import { test, expect } from './fixtures/todo.fixture';
import { TodoBuilder } from './builders/todo.builder';

test('should create a new todo', async ({ todoPage }) => {
  
  const todo = new TodoBuilder().build();
  await todoPage.createTodo(todo.title);
  await todoPage.expectTodoVisible(todo.title);

});

test('should mark a todo as completed', async ({ todoPage }) => {
    
  const todo = new TodoBuilder().build();  
  await todoPage.createTodo(todo.title);
  await todoPage.markTodoAsCompleted(todo.title);
  await todoPage.expectTodoCompleted(todo.title);

});

test('should edit a todo title', async ({ todoPage }) => {
    
  const todo = new TodoBuilder().build();
  await todoPage.createTodo(todo.title);
  const updatedTitle = `${todo.title} (edited)`;
  await todoPage.editTodo(todo.title, updatedTitle);
  await todoPage.expectTodoVisible(updatedTitle);

});

test('should delete a todo', async ({ todoPage }) => {

  const todo = new TodoBuilder().build();
  await todoPage.createTodo(todo.title);
  await todoPage.deleteTodo(todo.title);
  await todoPage.expectTodoNotVisible(todo.title);

});


test('should filter completed todos', async ({ todoPage }) => {

  const activeTodo = new TodoBuilder().build();
  const completedTodo = new TodoBuilder().build();
  await todoPage.createTodo(activeTodo.title);
  await todoPage.createTodo(completedTodo.title);
  await todoPage.markTodoAsCompleted(completedTodo.title);
  await todoPage.filterCompleted();
  await todoPage.expectTodoVisible(completedTodo.title);
  await todoPage.expectTodoNotVisible(activeTodo.title);

});


