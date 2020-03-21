// Enable DI(dependency injection) container TSringe
// see https://github.com/microsoft/tsyringe
import 'reflect-metadata';
import { container } from 'tsyringe';
import { DomainStorageImpl } from '@/models/domain-storage';
import { DomainRepositoryImpl } from '@/models/domain-repository';

container.register('DomainStorage', { useClass: DomainStorageImpl });

container.register('DomainRepository', { useClass: DomainRepositoryImpl });
