import { test as base } from '@playwright/test';

import { LoginPage } from '../pages/login.page';
import { NavigationComponent } from '../pages/navigation.component';
import { ToDoListPage } from '../pages/todo-list.page';
import { TodoBuilder } from '../builders/todo.builder';

type TodoFixtures = {
    todoPage: ToDoListPage;
};

export const test = base.extend<TodoFixtures>({
    todoPage: async ({ page }, use) => {

        // Navegacion

        const loginPage = new LoginPage(page);
        const navigation = new NavigationComponent(page);
        const todoPage = new ToDoListPage(page);

        // Login

        await loginPage.goto();
        await loginPage.login(
            'user@test.com',
            'Test1234!'
        );

        await navigation.goToTodos();

        // Creacion

        const INDEX = 3;

        for (let i = 0; i < INDEX; i++) {
            const todo = new TodoBuilder().build();
            await todoPage.createTodo(todo.title);
        }

        await use(todoPage);
    }
});

export { expect } from '@playwright/test';