import '@/inject';
import { container } from 'tsyringe';
import sinon from 'sinon';
import expect from 'expect';
import Domain from '@/models/domain';
import DomainRepositoryImpl from '@/models/domain-repository-impl';


describe('DomainRepository', () => {
  const mock = {
    get: sinon.mock(),
    set: sinon.mock(),
  };
  // Override default injection by mocked DomainStorage
  container.register('DomainStorage', { useValue: mock });
  // Instantiate DomainRepository
  const domainRepository = container.resolve(DomainRepositoryImpl);

  afterEach(() => {
    sinon.reset(); // reset all stubs
  });

  describe('save', () => {
    it('puts (id, value) pair into storage, and returns id', async () => {
      const domain: Domain = { name: 'confluence.com' };
      // Conditions
      mock.get.once().returns(Promise.resolve({}));
      mock.set.once().returns(Promise.resolve());
      // Run
      const id = await domainRepository.save(domain);
      // Verifications
      mock.get.verify();
      mock.set.verify();
      expect(mock.set.args[0]).toEqual([{ [id]: domain }]);
    });

    it('generates different ids between two calls', async () => {
      const domain: Domain = { name: 'confluence.com' };
      // Conditions
      mock.get.twice().returns(Promise.resolve({}));
      mock.set.twice().returns(Promise.resolve());
      // Run
      const id1 = await domainRepository.save(domain);
      const id2 = await domainRepository.save(domain);
      // Verifications
      mock.get.verify();
      mock.set.verify();
      expect(id1).not.toBe(id2);
    });
  });

  describe('update', () => {
    it('overwrites (oldId, oldValue) by (oldId, newValue) into storage', async () => {
      const id = 'dummy-uuid';
      const newDomain: Domain = { name: 'new-dummy-domain' };
      const record = { [id]: { name: 'old-dummy-domain' } };
      // Conditions
      mock.get.once().returns(Promise.resolve(record));
      mock.set.once().returns(Promise.resolve());
      // Run
      await domainRepository.update(id, newDomain);
      // Verifications
      mock.get.verify();
      mock.set.verify();
      expect(mock.set.args[0]).toEqual([{ [id]: newDomain }]);
    });
  });

  describe('find', () => {
    it('returns record if it exist', async () => {
      const id = 'dummy-uuid';
      const domain: Domain = { name: 'dummy-domain' };
      const record = { [id]: domain };
      // Conditions
      mock.get.once().returns(Promise.resolve(record));
      mock.set.never();
      // Run
      const res = await domainRepository.find(id);
      // Verifications
      mock.get.verify();
      mock.set.verify();
      expect(res).toEqual(domain);
    });

    it('returns undefined if no such id', async () => {
      const id = 'dummy-uuid';
      const domain: Domain = { name: 'dummy-domain' };
      const record = { [id]: domain };
      // Conditions
      mock.get.once().returns(Promise.resolve(record));
      mock.set.never();
      // Run
      const res = await domainRepository.find('not-exist-id');
      // Verifications
      mock.get.verify();
      mock.set.verify();
      expect(res).toBeUndefined();
    });
  });

  describe('findAll', () => {
    it('returns empty array if no record exist', async () => {
      // Conditions
      mock.get.once().returns(Promise.resolve({}));
      mock.set.never();
      // Run
      const res = await domainRepository.findAll();
      // Verifications
      mock.get.verify();
      mock.set.verify();
      expect(res).toEqual({});
    });

    it('returns all records', async () => {
      const domain1 = { name: 'domain1' };
      const domain2 = { name: 'domain2' };
      const records = { id1: domain1, id2: domain2 }
      // Conditions
      mock.get.once().returns(Promise.resolve(records));
      mock.set.never();
      // Run
      const res = await domainRepository.findAll();
      // Verifications
      mock.get.verify();
      mock.set.verify();
      expect(res).toEqual(records);
    });
  });

  describe('remove', () => {
    it('erases existing record if id matches', async () => {
      const id = 'dummy-uuid';
      const domain: Domain = { name: 'dummy-domain' };
      const record = { [id]: domain }; // storage only has one record
      // Conditions
      mock.get.once().returns(Promise.resolve(record));
      mock.set.once().returns(Promise.resolve());
      // Run
      await domainRepository.remove(id);
      // Verifications
      mock.get.verify();
      mock.set.verify();
      expect(mock.set.args[0]).toEqual([{}]);
    });

    it('do nothing if id is not exist', async () => {
      const id1 = 'dummy-uuid-1';
      const id2 = 'dummy-uuid-2';
      const domain: Domain = { name: 'dummy-domain' };
      const record = { [id1]: domain }; // storage only has one record
      // Conditions
      mock.get.once().returns(Promise.resolve(record));
      mock.set.once().returns(Promise.resolve());
      // Run
      await domainRepository.remove(id2);
      // Verifications
      mock.get.verify();
      mock.set.verify();
      expect(mock.set.args[0]).toEqual([record]);
    });
  });
});
