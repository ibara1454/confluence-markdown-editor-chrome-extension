import {
  VuexModule, Module, Mutation, Action, getModule,
} from 'vuex-module-decorators';
import store from '@/store';
import DomainRepositoryImpl from '@/models/domain-repository-impl';
import Domain from '@/models/domain';
import { container } from 'tsyringe';

@Module({ name: 'domain', store, dynamic: true })
class DomainModule extends VuexModule {
  // eslint-disable-next-line constructor-super
  private domainRepository = container.resolve(DomainRepositoryImpl);

  private domains: Array<{ id: string; domain: Domain }> = [];

  /**
   * The flag determines domains is neither initialized or not.
   */
  private initialized = false;

  get INITIALIZED(): boolean {
    return this.initialized;
  }

  get DOMAINS(): Array<{ id: string; domain: Domain }> {
    return this.domains;
  }

  @Mutation
  private initial(): void {
    this.initialized = true;
  }

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

  @Action
  public async save(domain: Domain): Promise<void> {
    await this.domainRepository.save(domain);
    await this.fetch();
  }

  @Action
  public async remove(id: string): Promise<void> {
    await this.domainRepository.remove(id);
    await this.fetch();
  }

  @Action({ commit: 'reset' })
  public async fetch(): Promise<{ [id: string]: Domain }> {
    return this.domainRepository.findAll();
  }

  @Action
  public async init(): Promise<void> {
    if (!this.INITIALIZED) {
      await this.fetch();
      this.initial();
    }
  }
}

const domainStore = getModule(DomainModule)

export default domainStore;

domainStore.init();
