import { API_BASE_URL } from '@/constants/api';
import { authStore } from '@/store/auth-store';

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly body?: unknown,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export async function apiGet<T>(path: string): Promise<T> {
  const url = `${API_BASE_URL}${path.startsWith('/') ? path : `/${path}`}`;
  const res = await fetch(url, {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${authStore.apiUserId}`,
    },
  });

  const text = await res.text();
  let json: unknown;
  try {
    json = text ? JSON.parse(text) : null;
  } catch {
    throw new ApiError('Invalid JSON response', res.status, text);
  }

  if (!res.ok) {
    throw new ApiError(res.statusText || 'Request failed', res.status, json);
  }

  return json as T;
}

export async function apiPost<T>(path: string, body?: unknown): Promise<T> {
  const url = `${API_BASE_URL}${path.startsWith('/') ? path : `/${path}`}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${authStore.apiUserId}`,
      ...(body !== undefined ? { 'Content-Type': 'application/json' } : {}),
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  const text = await res.text();
  let json: unknown;
  try {
    json = text ? JSON.parse(text) : null;
  } catch {
    throw new ApiError('Invalid JSON response', res.status, text);
  }

  if (!res.ok) {
    throw new ApiError(res.statusText || 'Request failed', res.status, json);
  }

  return json as T;
}
