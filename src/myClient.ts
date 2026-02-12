let accessToken: string | null = null;

function setAccessToken(token: string | null) {
  accessToken = token;
}

function getAccessToken() {
  return accessToken;
}

let refreshPromise: Promise<string> | null = null;

async function refreshAccessToken(init: RequestInit): Promise<string> {
  // If a refresh is already happening, reuse it
  if (refreshPromise) return refreshPromise;

  refreshPromise = (async () => {
    const res = await fetch(import.meta.env.VITE_AUTH_BASE_URL + '/refresh', {
      method: 'POST',
      headers: init.headers,
      credentials: 'include', // IMPORTANT: sends refresh cookie
    });

    if (!res.ok) {
      setAccessToken(null);
      throw new Error('Refresh failed');
    }

    const data = await res.json();
    setAccessToken(data.access_token);
    return data.access_token;
  })();

  try {
    return refreshPromise;
  } finally {
    refreshPromise = null;
  }
}

export async function apiFetch(input: RequestInfo, init: RequestInit = {}) {
  const token = getAccessToken();
  const url = import.meta.env.VITE_API_BASE_URL + input;

  const res = await fetch(url, {
    ...init,
    headers: {
      ...(init.headers ?? {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  if (res.status !== 401) return res;

  // Try refresh once
  const newToken = await refreshAccessToken(init);

  // Retry original request
  return fetch(url, {
    ...init,
    headers: {
      ...(init.headers ?? {}),
      Authorization: `Bearer ${newToken}`,
    },
  });
}
