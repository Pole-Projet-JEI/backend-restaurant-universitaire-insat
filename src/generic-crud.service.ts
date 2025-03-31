import { Repository, DeepPartial, FindOptionsWhere } from 'typeorm';
import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export abstract class GenericCrudService<Entity extends object> {
  constructor(protected readonly repository: Repository<Entity>) {}

  async create(data: DeepPartial<Entity>): Promise<Entity> {
    try {
      const entity = this.repository.create(data);

      // Check if the entity has a 'createdAt' field and set it if missing
      if ('createdAt' in entity && !(entity as any).createdAt) {
        (entity as any).createdAt = new Date();
      }

      // Check if the entity has an 'updatedAt' field and set it if missing
      if ('updatedAt' in entity && !(entity as any).updatedAt) {
        (entity as any).updatedAt = new Date();
      }

      return await this.repository.save(entity);
    } catch (error) {
      throw new ConflictException(
        'This record already exists or contains invalid data.',
      );
    }
  }

  async findOne(id: any): Promise<Entity> {
    if (!id) {
      throw new BadRequestException('ID parameter is required.');
    }
    const entity = await this.repository.findOne({ where: { id } as any });
    if (!entity) {
      throw new NotFoundException('The requested record was not found.');
    }
    return entity;
  }

  async findAll(): Promise<Entity[]> {
    const entities = await this.repository.find();
    if (entities.length === 0) {
      throw new NotFoundException('No records found.');
    }
    return entities;
  }

  async update(id: any, data: DeepPartial<Entity>): Promise<Entity> {
    if (!id) {
      throw new BadRequestException('ID parameter is required.');
    }
    const existingEntity = await this.findOne(id);

    try {
      // Check if the entity has an 'updatedAt' field and set it to the current date on update
      if ('updatedAt' in existingEntity && !(existingEntity as any).updatedAt) {
        (data as any).updatedAt = new Date();
      }

      await this.repository.update(id, data as any);
      return this.findOne(id);
    } catch (error) {
      throw new BadRequestException('Invalid request body.');
    }
  }

  async delete(id: any): Promise<void> {
    const entity = await this.repository.findOne({ where: { id } as unknown as FindOptionsWhere<Entity> });

    if (!entity) {
      throw new NotFoundException('Record not found.');
    }

    // Check if the entity has a `deletedAt` column (soft delete)
    if ('deletedAt' in entity) {
      const result = await this.repository.softDelete(id);
      if (!result.affected) {
        throw new NotFoundException('Record not found or already deleted.');
      }
    } else {
      const result = await this.repository.delete(id);
      if (!result.affected) {
        throw new NotFoundException('Record not found.');
      }
    }
  }
}
