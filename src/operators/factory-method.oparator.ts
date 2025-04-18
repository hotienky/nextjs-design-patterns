// src/operators/users.operator.ts
import { User } from '@/types/user';

const API_BASE_URL =  'http://localhost:3000';

// Interface define method fetch
export interface UserFetcher {
  fetchUsers(): Promise<User[]>;
}

// Factory abstract
export abstract class UserFetcherFactory {
  abstract createFetcher(): UserFetcher;
}

// Concrete Factory for API
export class ApiUserFetcherFactory extends UserFetcherFactory {
  createFetcher(): UserFetcher {
    return new ApiUserFetcher();
  }
}

// Concrete Fetcher for API
class ApiUserFetcher implements UserFetcher {
  async fetchUsers(): Promise<User[]> {
    try {
      const res = await fetch(`${API_BASE_URL}/api/users`, {
        cache: 'no-store',
      });
      if (!res.ok) throw new Error('Failed to fetch users');
      const data: User[] = await res.json();
      return data;
    } catch (err) {
      console.error(err);
      return [];
    }
  }
}

// Utility function to use Factory
export async function fetchUsersServerSide(): Promise<User[]> {
  const factory: UserFetcherFactory = new ApiUserFetcherFactory();
  const fetcher = factory.createFetcher();
  return fetcher.fetchUsers();
}