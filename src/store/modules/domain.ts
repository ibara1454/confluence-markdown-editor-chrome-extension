import {
  VuexModule, Module, Mutation, Action, getModule,
} from 'vuex-module-decorators';
import store from '@/store';
import DomainRepositoryImpl from '@/models/domain-repository-impl';
import Domain from '@/models/domain';
import { container } from 'tsyringe';

@Module({ name: 'domain', store, dynamic: true })
export class DomainModule extends VuexModule {
  // FIXME: inject components via constructor
  //  Since we are using the 'vuex-module-decorators', which does not allow
  //  us construct modules via constructors.
  private domainRepository = container.resolve(DomainRepositoryImpl);

  // The id-domain related data
  // We must use array instead of object, because by some constraints Vue cannot
  // detect insertion and deletion on objects.
  private domains: Array<{ id: string; domain: Domain }> = [];

  /**
   * The flag determines domains is neither initialized or not.
   */
  private isInitialized = false;

  get INITIALIZED(): boolean {
    return this.isInitialized;
  }

  get DOMAINS(): Array<{ id: string; domain: Domain }> {
    return this.domains;
  }

  /**
   * Change the state of this module to `initialized`.
   */
  @Mutation
  private initialized(): void {
    this.isInitialized = true;
  }

  /**
   * Update the current domains with given id-domain related object.
   * @param domains the object which indicates the  id-domain relation.
   */
  @Mutation
  public reset(domains: { [id: string]: Domain }): void {
    // Convert the given type { [id: string]: Domain }
    // to Array<{ id: string; domain: Domain }>
    this.domains = Object.keys(domains)
      .reduce(
        (acc, id) => [...acc, { id, domain: domains[id] }],
        [] as Array<{ id: string; domain: Domain }>,
      );
  }

  /**
   * Save the given new domain asynchronously.
   * @param domain new domain
   */
  @Action
  public async save(domain: Domain): Promise<void> {
    await this.domainRepository.save(domain);
    await this.fetch();
  }

  /**
   * Remove a specific domain by its id.
   * @param id the unique id to such domain
   */
  @Action
  public async remove(id: string): Promise<void> {
    await this.domainRepository.remove(id);
    await this.fetch();
  }

  /**
   * Synchronize the domains between storage and this module.
   * Note: in most cases, you should not call this method directly.
   * @returns the latest domains
   */
  @Action({ commit: 'reset' })
  public async fetch(): Promise<{ [id: string]: Domain }> {
    const domains = this.domainRepository.findAll();
    return domains;
  }

  /**
   * Initialize this module if it did not.
   */
  @Action({ rawError: true })
  public async init(): Promise<void> {
    if (!this.INITIALIZED) {
      await this.fetch();
      // Mark this module is initialized
      this.initialized();
    }
  }
}

export const DomainStore = getModule(DomainModule);
