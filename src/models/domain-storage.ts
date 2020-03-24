/* eslint-disable max-classes-per-file */
import Domain from '@/models/domain';

/**
 * The wrapper class provides general read/write interfaces to the
 * extension's storage `chrome.storage.sync`.
 *
 * The concept of this storage is inspired by Firestore.
 * To guaratee the safety of concurrent read/write, Firestore
 * stores arrays by using the object structure.
 */
interface DomainStorage {
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

export default DomainStorage;
