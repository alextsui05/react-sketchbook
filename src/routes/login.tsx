import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';

export const Route = createFileRoute('/login')({
  component: RouteComponent,
});

function RouteComponent() {
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem('accessToken'),
  );
  const [refreshToken, setRefreshToken] = useState(
    localStorage.getItem('refreshToken'),
  );

  const login = async (event: React.FormEvent<HTMLFormElement>) => {
    // const url = 'https://a.atsui.click/auth/login';
    const url = 'http://localhost:3000/login';
    event.preventDefault();
    try {
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          email: event.currentTarget.email.value,
          password: event.currentTarget.password.value,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      const data = await response.json();
      console.log(data);
      setAccessToken(data.access_token);
      setRefreshToken(data.refresh_token);
      localStorage.setItem('accessToken', data.access_token);
      localStorage.setItem('refreshToken', data.refresh_token);
    } catch (error) {
      console.error(error);
    }
  };

  const refresh = async () => {
    const url = 'http://localhost:3000/refresh';
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        refresh_token: refreshToken,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    console.log(data);
    setAccessToken(data.access_token);
    setRefreshToken(data.refresh_token);
    localStorage.setItem('accessToken', data.access_token);
    localStorage.setItem('refreshToken', data.refresh_token);
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setAccessToken(null);
    setRefreshToken(null);
  };

  return (
    <div>
      {accessToken && (
        <>
          <p>Logged in</p>
          <p>Access token: {accessToken}</p>
          <p>Refresh token: {refreshToken}</p>
          <button onClick={logout}>Logout</button>
          <button onClick={refresh}>Refresh</button>
        </>
      )}
      {!accessToken && (
        <>
          <p>Not logged in</p>
          <form onSubmit={login}>
            <label htmlFor="email">Email</label>
            <input type="email" name="email" />
            <label htmlFor="password">Password</label>
            <input type="password" name="password" />
            <button type="submit">Login</button>
          </form>
        </>
      )}
    </div>
  );
}
