import { http, HttpResponse } from "msw";

interface LoginRequest {
  username: string;
  password: string;
}

interface LoginResponse {
  token: string;
  user: { name: string };
}

// @ts-ignore
export const handlers = [
  //   http.post<never, LoginRequest, LoginResponse>('https://api.example.com/auth/login', async ({ request }) => {
  //     const body = await request.json();
  //     if (body.username === 'testuser' && body.password === 'password123') {
  //       return HttpResponse.json({ token: 'mock-token', user: { name: 'Test User' } }, { status: 200 });
  //     }
  //     return HttpResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  //   }),
  //   http.get<never, never, { message: string }>('https://api.example.com/dashboard', () => {
  //     return HttpResponse.json({ message: 'Welcome to dashboard' }, { status: 200 });
  //   })
];
