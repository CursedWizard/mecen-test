import type { FeedTierFilter } from '@/lib/api/types';
import { makeAutoObservable } from 'mobx';

/**
 * Feed screen UI state (filters). Query hooks read `tierFilter` from components wrapped in `observer`.
 */
export class FeedStore {
  tierFilter: FeedTierFilter = undefined;

  constructor() {
    makeAutoObservable(this);
  }

  setTierFilter(tier: FeedTierFilter): void {
    this.tierFilter = tier;
  }
}

export const feedStore = new FeedStore();
