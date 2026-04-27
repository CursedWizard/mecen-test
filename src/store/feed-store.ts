import type { FeedTierFilter } from '@/lib/api/types';
import { makeAutoObservable, runInAction } from 'mobx';

/**
 * Feed screen UI state (filters). Query hooks read `tierFilter` from components wrapped in `observer`.
 */
export class FeedStore {
  tierFilter: FeedTierFilter = undefined;
  isFeedLoading: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  setTierFilter(tier: FeedTierFilter): void {
    runInAction(() => {
      this.tierFilter = tier;
    });
  }

  setIsFeedLoading(isLoading: boolean): void {
    runInAction(() => {
      this.isFeedLoading = isLoading;
    });
  }
}

export const feedStore = new FeedStore();
