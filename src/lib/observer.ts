// src/lib/observer.ts
export interface Observer<T> {
  update(data: T): void;
}

export interface Subject<T> {
  attach(observer: Observer<T>): void;
  detach(observer: Observer<T>): void;
  notify(): void;
}

export class GenericSubject<T> implements Subject<T> {
  private observers: Observer<T>[] = [];
  private data: T;

  constructor(initialData: T) {
    this.data = initialData;
  }

  attach(observer: Observer<T>) {
    this.observers.push(observer);
  }

  detach(observer: Observer<T>) {
    this.observers = this.observers.filter(obs => obs !== observer);
  }

  notify() {
    for (const observer of this.observers) {
      observer.update(this.data);
    }
  }

  setData(data: T) {
    this.data = data;
    this.notify();
  }

  getData(): T {
    return this.data;
  }
}