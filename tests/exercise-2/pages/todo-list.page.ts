import { Page, expect, Locator } from "@playwright/test";

export class ToDoListPage {
    constructor(private readonly page: Page) {}

    private getTodoItem(title: string): Locator {
        return this.page.getByTestId('todo-item').filter({
          has: this.page.getByText(title),
        });
      }

    async createTodo(title: string): Promise<void> {

        await this.page.getByTestId('todo-input').fill(title);
        await this.page.getByTestId('add-todo-button').click();
        await expect(this.getTodoItem(title)).toBeVisible();
    }

    async markTodoAsCompleted(title: string): Promise<void> {

        const todo = this.getTodoItem(title);
        await todo.locator('input[type="checkbox"]').check();
        await expect(todo.locator('input[type="checkbox"]')).toBeChecked();
    }

    async editTodo(oldTitle: string, newTitle: string): Promise<void> {

        const todo = this.getTodoItem(oldTitle);
        await todo.locator('label').dblclick();
        const input = todo.locator('.edit-input');
        await input.fill(newTitle);
        await input.press('Enter');
        await expect(this.getTodoItem(newTitle)).toBeVisible();
    }

    async deleteTodo(title: string): Promise<void> {

        const todo = this.getTodoItem(title);
        await todo.getByRole('button', { name: 'Eliminar' }).click();
        await expect(this.getTodoItem(title)).toHaveCount(0);
    }

    async filterAll(): Promise<void> {
        await this.page.getByTestId('filter-all').click();
    }

    async filterActive(): Promise<void> {
        await this.page.getByTestId('filter-active').click();
    }

    async filterCompleted(): Promise<void> {
        await this.page.getByTestId('filter-completed').click();
    }

    async expectTodoVisible(title: string): Promise<void> {
        await expect(this.getTodoItem(title)).toBeVisible();
    }

    async expectTodoNotVisible(title: string): Promise<void> {
        await expect(this.getTodoItem(title)).toBeVisible();
    }

    async expectTodoCompleted(title: string): Promise<void> {
        await expect(this.getTodoItem(title).locator('input[type="checkbox"]')).toBeChecked();
    }
}