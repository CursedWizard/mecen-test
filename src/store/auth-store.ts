import { API_USER_ID } from '@/constants/api';
import { makeAutoObservable } from 'mobx';

/**
 * Authentication/session state. Expand with tokens and user profile as auth is implemented.
 */
export class AuthStore {
  /** Bearer token for `BearerUUID` security (OpenAPI). */
  apiUserId: string;

  constructor(initialApiUserId: string = API_USER_ID) {
    this.apiUserId = initialApiUserId;
    makeAutoObservable(this);
  }

  setApiUserId(id: string): void {
    this.apiUserId = id;
  }
}

export const authStore = new AuthStore();
