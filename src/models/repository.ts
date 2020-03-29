export interface AsynchronizedRepository<Id, T> {
  save(item: T): Promise<Id>;

  update(id: Id, item: T): Promise<void>;

  find(id: Id): Promise<T | undefined>;

  findAll(): Promise<{ [id: string]: T }>;

  remove(id: Id): Promise<void>;
}
