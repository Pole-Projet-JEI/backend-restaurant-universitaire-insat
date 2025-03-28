import { Repository, DeepPartial, FindOptionsWhere } from 'typeorm';
import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export abstract class GenericCrudService<Entity extends object> {
  constructor(private readonly repository: Repository<Entity>) {}

  async create(data: DeepPartial<Entity>): Promise<Entity> {
    try {
      const entity = this.repository.create(data);
      return await this.repository.save(entity);
    } catch (error) {
      throw new ConflictException(
        'This record already exists or contains invalid data.',
      );
    }
  }

  async findOne(id: number): Promise<Entity> {
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

  async update(id: number, data: DeepPartial<Entity>): Promise<Entity> {
    if (!id) {
      throw new BadRequestException('ID parameter is required.');
    }
    await this.findOne(id);
    try {
      await this.repository.update(id, data as any);
      return this.findOne(id);
    } catch (error) {
      throw new BadRequestException('Invalid request body.');
    }
  }

  async delete(id: number): Promise<void> {
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