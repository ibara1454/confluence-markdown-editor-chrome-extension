import Domain from '@/models/domain';
import { AsynchronizedRepository } from '@/models/repository';

/**
 * A high-level repository provides asynchronized read/write interfaces
 * to storage of domains.
 */
interface DomainRepository extends AsynchronizedRepository<string, Domain> {
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
   * Return all domain contains in storage.
   * @returns object contains domain with unique id respectively.
   */
  findAll(): Promise<{ [id: string]: Domain }>;

  /**
   * Remove a specific domain by id.
   * @param id the id of such domain.
   */
  remove(id: string): Promise<void>;
}

export default DomainRepository;
