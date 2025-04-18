// src/lib/observer.ts
import { User } from '@/types/user';

export interface Observer {
  update(data: User[]): void;
}

export interface Subject {
  attach(observer: Observer): void;
  detach(observer: Observer): void;
  notify(): void;
}

export class UserSubject implements Subject {
  private observers: Observer[] = [];
  private users: User[] = [];

  attach(observer: Observer) {
    this.observers.push(observer);
  }

  detach(observer: Observer) {
    this.observers = this.observers.filter(obs => obs !== observer);
  }

  notify() {
    for (const observer of this.observers) {
      observer.update(this.users);
    }
  }

  setUsers(users: User[]) {
    this.users = users;
    this.notify();
  }
}