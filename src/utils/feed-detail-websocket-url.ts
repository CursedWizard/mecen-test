import { API_WS_BASE_URL } from '@/constants/api';

/**
 * Builds `WS /ws?token=<uuid>` URL aligned with `API_BASE_URL` (same host and path prefix as REST).
 */
export function buildFeedRealtimeWebSocketUrl(token: string): string {
  const wsOrigin = API_WS_BASE_URL;
  const baseWithSlash = wsOrigin.endsWith('/') ? wsOrigin : `${wsOrigin}/`;
  const url = new URL('ws', baseWithSlash);
  url.searchParams.set('token', token);
  return url.toString();
}
