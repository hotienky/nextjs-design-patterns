// src/operators/news.operator.ts
import { UserSubject } from '@/lib/observer';
import { User } from '@/types/user';

const userSubject = new UserSubject();

export async function fetchAndUpdateUsers() {
  try {
    const res = await fetch('/api/users', {
      cache: 'no-store',
    });
    if (!res.ok) throw new Error('Failed to fetch users');
    const data: User[] = await res.json();
    userSubject.setUsers(data);
  } catch (err) {
    console.error(err);
    userSubject.setUsers([]); 
  }
}

export function subscribeToUsers(observer: { update: (users: User[]) => void }) {
  const observerAdapter = {
    update: (data: User[]) => observer.update(data),
  };
  userSubject.attach(observerAdapter);
  return () => userSubject.detach(observerAdapter);
}

export async function fetchUsersServerSide(): Promise<User[]> {
  try {
    const res = await fetch('http://localhost:3000/api/users', {
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