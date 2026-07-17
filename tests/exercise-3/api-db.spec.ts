import { test, expect } from '@playwright/test';
import { login, createTodo } from './api-helpers';

test('todo created via API', async ({ page, request }) => {
    const title = `TEST-${crypto.randomUUID()}`;
  
    const auth = await login(
      request,
      'user@test.com',
      'Test1234!'
    );
  
    await createTodo(request, auth.token, title);
  
    await page.addInitScript(({ token, userName }) => {
      localStorage.setItem('token', token);
      localStorage.setItem('userName', userName);
    }, {
      token: auth.token,
      userName: auth.user.name,
    });
  
    await page.goto('/todos');
  
    await expect(page.getByText(title)).toBeVisible();
  });