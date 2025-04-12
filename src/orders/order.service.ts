import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from '../typeorm/entities/order.entity';
import { GenericCrudService } from '../generic-crud.service';
import { Repository, FindOptionsWhere } from 'typeorm';
import { Student } from '../typeorm/entities/Users/Student.entity';
import { OrderDto } from './order.dto';
import { Status } from '../typeorm/entities/order.entity';

@Injectable()
export class OrderService extends GenericCrudService<Order> {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
  ) {
    super(orderRepository);
  }

  async create(orderData: OrderDto): Promise<Order> {
    const { studentNationalId, ...orderFields } = orderData;
    
    const student = await this.studentRepository.findOne({ 
      where: { nationalId: studentNationalId } as FindOptionsWhere<Student>
    });
    
    if (!student) {
      throw new NotFoundException(`Student with nationalId ${studentNationalId} not found`);
    }

    return super.create({
      ...orderFields,
      student,
    });
  }

  async update(id: number, orderData: Partial<OrderDto>): Promise<Order> {
    if (orderData.studentNationalId) {
      const student = await this.studentRepository.findOne({ 
        where: { nationalId: orderData.studentNationalId } as FindOptionsWhere<Student>
      });
      
      if (!student) {
        throw new NotFoundException(`Student with nationalId ${orderData.studentNationalId} not found`);
      }

      return super.update(id, {
        ...orderData,
        student,
      });
    }

    return super.update(id, orderData);
  }

  async getOrdersByStatus(status: Status): Promise<Order[]> {
    // clean the object please
    return this.orderRepository.find({
      where: { status },
      relations: ['student'],
      order: { createdAt: 'DESC' }
    });
  }

  async getStudentOrders(studentNationalId: number): Promise<Order[]> {
    return this.orderRepository.find({
      where: { student: { nationalId: studentNationalId } },
      relations: ['student'],
      order: { createdAt: 'DESC' }
    });
  }
}