import { APIRequestContext, expect } from "@playwright/test";

export interface LoginResponse {
  token: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
}
  
export interface TodoResponse {
  id: number;
  title: string;
  completed: boolean;
  user_id: number;
  created_at: string;
}

export async function login(
  request: APIRequestContext,
  email: string,
  password: string
  ): Promise<LoginResponse> {

    const response = await request.post('/api/auth/login', {
      data: { email, password },
    });
  
    expect(response.ok()).toBeTruthy();
  
    return await response.json();
  }

export async function createTodo(
  request: APIRequestContext,
  token: string,
  title: string
): Promise<TodoResponse> {
  
    const response = await request.post('/api/todos', {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      data: {
        title,
      },
    });
  
    expect(response.ok()).toBeTruthy();
  
    return await response.json();
  }
