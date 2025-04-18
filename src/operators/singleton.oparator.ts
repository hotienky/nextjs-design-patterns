// src/operators/users.operator.ts
import { User } from '@/types/user';

const API_BASE_URL = 'http://localhost:3000';

export class UserOperator {
  private static instance: UserOperator | null = null;

  private constructor() {}

  // get instance Singleton
  public static getInstance(): UserOperator {
    if (!UserOperator.instance) {
      UserOperator.instance = new UserOperator();
    }
    return UserOperator.instance;
  }

  // func fetch users server-side
  public async fetchUsers(): Promise<User[]> {
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