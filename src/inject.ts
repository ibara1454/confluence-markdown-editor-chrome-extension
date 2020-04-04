// Enable DI(dependency injection) container TSringe
// see https://github.com/microsoft/tsyringe
// eslint-disable-next-line import/no-extraneous-dependencies
import 'reflect-metadata';
import { container } from 'tsyringe';
import DomainStorageImpl from '@/models/domain-storage-impl';
import DomainStorageDevelopImpl from '@/models/domain-storage-impl-develop';
import DomainRepositoryImpl from '@/models/domain-repository-impl';

if (process.env.NODE_ENV === 'development') {
  container.register('DomainStorage', { useClass: DomainStorageDevelopImpl });
} else {
  container.register('DomainStorage', { useClass: DomainStorageImpl });
}

container.register('DomainRepository', { useClass: DomainRepositoryImpl });
