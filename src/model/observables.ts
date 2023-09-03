export type Observer<T> = (state: T) => void;

export abstract class Observable<T> {
  private observers: Observer<T>[] = [];

  subscribe(observer: Observer<T>): void {
    this.observers.push(observer);
  }

  unsubscribe(observer: Observer<T>): void {
    const index = this.observers.indexOf(observer);
    if (index > -1) {
      this.observers.splice(index, 1);
    }
  }

  protected notify(state: T): void {
    for (const observer of this.observers) {
      observer(state);
    }
  }
}

export class ObservableValue<T> extends Observable<T> {
  constructor(private value: T) {
    super();
  }

  set(newValue: T): void {
    this.value = newValue;
    this.notify(newValue);
  }

  get(): T {
    return this.value;
  }
}

type ArrayChangeType = 'add' | 'remove' | 'update';

interface ArrayChange<T> {
  type: ArrayChangeType;
  value: T;
  index?: number;
}

export class ObservableArray<T> extends Observable<ArrayChange<T>> {
  constructor(private array: T[] = []) {
    super();
  }

  add(value: T): void {
    this.array.push(value);
    this.notify({ type: 'add', value });
  }

  remove(index: number): void {
    const value = this.array.splice(index, 1)[0];
    this.notify({ type: 'remove', value, index });
  }

  update(index: number, newValue: T): void {
    this.array[index] = newValue;
    this.notify({ type: 'update', value: newValue, index });
  }

  get(): T[] {
    return this.array;
  }
}