// Enable DI(dependency injection) container TSringe
// see https://github.com/microsoft/tsyringe
import 'reflect-metadata';
import { container } from 'tsyringe';
import DomainStorageImpl from '@/models/domain-storage-impl';
import DomainRepositoryImpl from '@/models/domain-repository-impl';

container.register('DomainStorage', { useClass: DomainStorageImpl });

container.register('DomainRepository', { useClass: DomainRepositoryImpl });
