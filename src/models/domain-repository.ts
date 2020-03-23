import Domain from '@/models/domain';
import { injectable, inject } from 'tsyringe';
import { DomainStorage } from '@/models/domain-storage';
import { AsynchronizedRepository } from '@/models/repository';
import { v4 as uuidv4 } from 'uuid';

/**
 * A high-level repository provides asynchronized read/write interfaces
 * to storage of domains.
 */
export interface DomainRepository extends AsynchronizedRepository<string, Domain> {
  /**
   * Add a given domain to storage.
   * @param domain any domain.
   * @returns unique id of such domain.
   */
  save(domain: Domain): Promise<string>;

  /**
   * Update a specific domain on storage.
   * @param id the id of such domain.
   * @param domain new value of domain.
   */
  update(id: string, domain: Domain): Promise<void>;

  /**
   * Find a specific domain by id.
   * If the id exist, then the corresponding domain will be returned.
   * Otherwise, undefined will be returned.
   * @param id the id of such domain.
   */
  find(id: string): Promise<Domain | undefined>;

  /**
   * Find a specific domain by id.
   * If the id exist, then the corresponding domain will be returned.
   * Otherwise, undefined will be returned.
   * @param id the id of such domain.
   */
  findAll(): Promise<Domain[]>;

  /**
   * Remove a specific domain by id.
   * @param id the id of such domain.
   */
  remove(id: string): Promise<void>;
}

/**
 * A high-level repository provides asynchronized read/write interfaces
 * to storage of domains.
 */
@injectable()
export class DomainRepositoryImpl implements DomainRepository {
  // eslint-disable-next-line no-useless-constructor
  constructor(@inject('DomainStorage') private storage: DomainStorage) {}

  /**
   * Add a given domain to storage.
   * @param domain any domain.
   * @returns unique id of such domain.
   */
  async save(domain: Domain): Promise<string> {
    const domains = await this.storage.get();
    // Generate a unique id for new domain
    const uuid = uuidv4();
    const pair = { [uuid]: domain };
    // Mix pair and domains
    const newDict = { ...domains, ...pair };
    await this.storage.set(newDict);
    return uuid;
  }

  /**
   * Update a specific domain on storage.
   * @param id the id of such domain.
   * @param domain new value of domain.
   */
  async update(id: string, domain: Domain): Promise<void> {
    const domains = await this.storage.get();
    domains[id] = domain;
    await this.storage.set(domains);
  }

  /**
   * Find a specific domain by id.
   * If the id exist, then the corresponding domain will be returned.
   * Otherwise, undefined will be returned.
   * @param id the id of such domain.
   */
  async find(id: string): Promise<Domain | undefined> {
    const domains = await this.storage.get();
    const res = domains[id];
    return res;
  }

  /**
   * Return all domain contains in storage.
   * @returns the domain list.
   */
  async findAll(): Promise<Domain[]> {
    const domains = await this.storage.get();
    return Object.values(domains);
  }

  /**
   * Remove a specific domain by id.
   * @param id the id of such domain.
   */
  async remove(id: string): Promise<void> {
    const domains = await this.storage.get();
    delete domains[id];
    await this.storage.set(domains);
  }
}
