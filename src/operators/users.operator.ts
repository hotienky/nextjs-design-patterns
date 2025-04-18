// src/operators/users.operator.ts
import { User } from '@/types/user';
import { GenericSubject } from '@/lib/observer';

const API_BASE_URL ='http://localhost:3000';

export interface UserFetcher {
  fetchUsers(): Promise<User[]>;
}

export abstract class UserFetcherFactory {
  abstract createFetcher(subject: GenericSubject<User[]>): UserFetcher;
}

export class ApiUserFetcherFactory extends UserFetcherFactory {
  createFetcher(subject: GenericSubject<User[]>): UserFetcher {
    return new ApiUserFetcher(subject);
  }
}

class ApiUserFetcher implements UserFetcher {
  private subject: GenericSubject<User[]>;

  constructor(subject: GenericSubject<User[]>) {
    this.subject = subject;
  }

  async fetchUsers(): Promise<User[]> {
    try {
      const res = await fetch(`${API_BASE_URL}/api/users`, {
        cache: 'no-store',
      });
      if (!res.ok) throw new Error('Failed to fetch users');
      const data: User[] = await res.json();
      this.subject.setData(data); 
      return data;
    } catch (err) {
      console.error(err);
      this.subject.setData([]);
      return [];
    }
  }
}

export class UserOperator {
  private static subject: GenericSubject<User[]> = new GenericSubject<User[]>([]);

  static getSubject(): GenericSubject<User[]> {
    return UserOperator.subject;
  }

  static async fetchUsersServerSide(): Promise<User[]> {
    const factory = new ApiUserFetcherFactory();
    const fetcher = factory.createFetcher(UserOperator.subject);
    return fetcher.fetchUsers();
  }

  static subscribeToUsers(observer: { update: (users: User[]) => void }) {
    const observerAdapter = {
      update: (data: User[]) => observer.update(data),
    };
    UserOperator.subject.attach(observerAdapter);
    return () => UserOperator.subject.detach(observerAdapter);
  }
}