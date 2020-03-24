import DomainStorage from '@/models/domain-storage';
import Domain from '@/models/domain';
import { injectable } from 'tsyringe';

/**
 * A stub implementation of DomainStorage.
 *
 * This class is **ONLY** for development usage.
 *
 * This simple class make us run `DomainStorage` in normal environment possible.
 * Since normal environment (browser without extension installation) has no
 * `chrome.storage.sync` extension APIs, we cannot use `DomainStorageImpl`
 * (which is implemented by `chrome.storage.sync`) for `DomainStorage`.
 */
@injectable()
export default class DomainStorageImplDevelop implements DomainStorage {
  private storage = {};

  async ['get'](): Promise<{ [key: string]: Domain }> {
    return Promise.resolve(this.storage);
  }

  async ['set'](items: { [key: string]: Domain }): Promise<void> {
    this.storage = items;
    return Promise.resolve();
  }
}
