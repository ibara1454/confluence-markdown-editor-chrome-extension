export interface Repository<Id, T> {
  save(item: T): Id;

  update(id: Id, item: T): void;

  find(id: Id): T | undefined;

  findAll(): T[];

  remove(id: Id): void;
}

export interface AsynchronizedRepository<Id, T> {
  save(item: T): Promise<Id>;

  update(id: Id, item: T): Promise<void>;

  find(id: Id): Promise<T | undefined>;

  findAll(): Promise<T[]>;

  remove(id: Id): Promise<void>;
}
