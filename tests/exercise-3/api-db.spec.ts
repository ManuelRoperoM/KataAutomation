import { test, expect } from '@playwright/test';
import { login, createTodo } from './api-helpers';
import { isTodoCompleted, closeConnection, cleanupTestTodos } from './db-helper';


let titleTodo: string;


test.describe('Connection with DataBase and api', () => {
  test.beforeEach(() => {
    titleTodo = `TEST-${crypto.randomUUID()}`;
  });
  
  test.afterEach(async () => {
    await cleanupTestTodos(titleTodo);
  });
  
  test.afterAll(async () => {
    await closeConnection();
  });
  // PRIMERA PARTE
  test('todo created via API', async ({ page, request }) => {
    
      const auth = await login(
        request,
        'user@test.com',
        'Test1234!'
      );
    
      await createTodo(request, auth.token, titleTodo);
    
      await page.addInitScript(({ token, userName }) => {
        localStorage.setItem('token', token);
        localStorage.setItem('userName', userName);
      }, {
        token: auth.token,
        userName: auth.user.name,
      });
    
      await page.goto('/todos');
    
      await expect(page.getByText(titleTodo)).toBeVisible();
  });
  
  // SEGUNDA PARTE
  test('Completed todo in database', async ({ page, request }) => {
  
    const auth = await login(
      request,
      'user@test.com',
      'Test1234!'
    );
  
    const todo = await createTodo(
        request,
        auth.token,
        titleTodo
    );
  
    await page.addInitScript(
        ({ token, userName }) => {
            localStorage.setItem('token', token);
            localStorage.setItem('userName', userName);
        },
        {
            token: auth.token,
            userName: auth.user.name,
        }
    );
  
    await page.goto('/todos');
  
    const todoItem = page
        .getByTestId('todo-item')
        .filter({
            has: page.getByText(titleTodo, { exact: true }),
        });
  
    await todoItem
        .locator('input[type="checkbox"]')
        .check();
  
    const completed = await isTodoCompleted(todo.id);
  
    expect(completed).toBe(true);
  });
})
