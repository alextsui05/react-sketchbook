import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { apiFetch } from '../myClient';

export const Route = createFileRoute('/login')({
  component: RouteComponent,
});

function RouteComponent() {
  const [accessToken, setAccessToken] = useState(null);

  const login: React.SubmitEventHandler<HTMLFormElement> = async (event) => {
    const url = import.meta.env.VITE_AUTH_BASE_URL + '/login';
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

  const getCookie = (name: string): string | null => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
    return null;
  };

  const refresh = async () => {
    const url = import.meta.env.VITE_AUTH_BASE_URL + '/refresh';
    const csrfToken = getCookie('atsui.click:csrf_token');

    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (csrfToken) {
      headers['X-CSRF-Token'] = csrfToken;
    }

    const response = await fetch(url, {
      method: 'POST',
      headers,
      credentials: 'include',
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      console.error('Refresh failed:', error);
      return;
    }

    const data = await response.json();
    console.log('Refresh successful:', data);
    setAccessToken(data.access_token);
  };

  const logout = async () => {
    await fetch(import.meta.env.VITE_AUTH_BASE_URL + '/logout', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    setAccessToken(null);
  };

  useEffect(() => {
    const fetchMe = async () => {
      const csrfToken = getCookie('atsui.click:csrf_token');
      const response = await apiFetch('/me', {
        headers: {
          'Content-Type': 'application/json',
          ...(csrfToken ? { 'X-CSRF-Token': csrfToken } : {}),
        },
        credentials: 'include',
      });

      const data = await response.json();
      console.log(data);
      setAccessToken(data.email);
    };
    fetchMe();
  }, []);

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
