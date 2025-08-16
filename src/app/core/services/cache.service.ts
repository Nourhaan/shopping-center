import {Injectable} from '@angular/core';

interface CacheEntry<T> {
  value: T;
  expiry: number; // timestamp when cache expires
}

@Injectable({
  providedIn: 'root'
})
export class CacheService {

  constructor() {
  }

  private cache = new Map<string, CacheEntry<any>>();

  set<T>(key: string, value: T, ttl: number = 300000): void { // default 5 min
    const expiry = Date.now() + ttl;
    this.cache.set(key, {value, expiry});
  }

  get<T>(key: string): T | null {
    const entry = this.cache.get(key);
    if (!entry) return null;

    if (Date.now() > entry.expiry) {
      this.cache.delete(key); // delete if it is expired
      return null;
    }
    return entry.value;
  }

  clear(): void {
    this.cache.clear();
  }
}
