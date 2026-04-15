/** Base URL from OpenAPI `servers[0].url`. */
export const API_BASE_URL = 'https://k8s.mectest.ru/test-app';
export const API_WS_BASE_URL = 'wss://k8s.mectest.ru/test-app';

/**
 * Default bearer token for `BearerUUID` security (any valid UUID).
 * `AuthStore` initializes `apiUserId` from this until real auth is wired.
 */
export const API_USER_ID = '550e8400-e29b-41d4-a716-446655440000';
