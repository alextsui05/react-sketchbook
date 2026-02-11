import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';

export const Route = createFileRoute('/login')({
  component: RouteComponent,
});

function RouteComponent() {
  const [accessToken, setAccessToken] = useState(null);

  const login: React.SubmitEventHandler<HTMLFormElement> = async (event) => {
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
    } catch (error) {
      console.error(error);
    }
  };

  const refresh = async () => {
    const url = 'http://localhost:3000/refresh';
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    const data = await response.json();
    console.log(data);
    setAccessToken(data.access_token);
  };

  const logout = () => {
    setAccessToken(null);
  };

  return (
    <div>
      {accessToken && (
        <>
          <p>Logged in</p>
          <p>Access token: {accessToken}</p>
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
