import Domain from '@/models/domain';
import { injectable } from 'tsyringe';

/**
 * The wrapper class provides general read/write interfaces to the
 * extension's storage `chrome.storage.sync`.
 *
 * The concept of this storage is inspired by Firestore.
 * To guaratee the safety of concurrent read/write, Firestore
 * stores arrays by using the object structure.
 */
export interface DomainStorage {
  /**
   * Returns all domains in key-value format.
   * @returns key-value object contains all domains in its value.
   */
  ['get'](): Promise<{ [key: string]: Domain }>;
  /**
   * Override current domains by given values.
   * @param items key-value object of domains.
   */
  ['set'](items: { [key: string]: Domain }): Promise<void>;
}


/**
 * Convert a callback-type function `f` with signature
 * `(arg1: T, callback: (res: R) => void) => void`
 * to
 * `(arg1: T) => Promise<R>`
 * @param f given callback-type function
 * @returns promisified function
 */
function promisify1<T, R>(f: (arg1: T, callback: (res: R) => void) => void):
  (arg1: T) => Promise<R> {
  return (arg1: T) => new Promise((resolve) => {
    f(arg1, (res: R) => {
      resolve(res);
    });
  });
}

/**
 * The wrapper class provides general read/write interfaces to the
 * extension's storage `chrome.storage.sync`.
 *
 * The concept of this storage is inspired by Firestore.
 * To guaratee the safety of concurrent read/write, Firestore
 * stores arrays by using the object structure.
 */
@injectable()
export class DomainStorageImpl implements DomainStorage {
  private domainKey = 'domains';

  // promisified function of `chrome.storage.sync.get`
  private syncGet = promisify1(chrome.storage.sync.get.bind(undefined));

  // promisified function of `chrome.storage.sync.set`
  private syncSet = promisify1(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (items: {[key: string]: any}, callback: (arg1: void) => void) => {
      chrome.storage.sync.set(items, () => callback());
    },
  );

  /**
   * Returns all domains in key-value format.
   * @returns key-value object contains all domains in its value.
   */
  async ['get'](): Promise<{ [key: string]: Domain }> {
    const resMap = await this.syncGet(this.domainKey);
    return resMap[this.domainKey];
  }

  /**
   * Override current domains by given values.
   * @param items key-value object of domains.
   */
  async ['set'](items: { [key: string]: Domain }): Promise<void> {
    // Because of the constraint of `chrome.storage.sync`,
    // we cannot just update a part of values corresponding to the given key.
    // The only one way to update values is override all the origin values by
    // new values.
    await this.syncSet({ [this.domainKey]: items });
  }
}
