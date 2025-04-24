import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from '../typeorm/entities/order.entity';
import { GenericCrudService } from '../generic-crud.service';
import { Repository, FindOptionsWhere } from 'typeorm';
import { Student } from '../typeorm/entities/Users/Student.entity';
import { OrderDto } from './order.dto';
import { Status } from '../typeorm/entities/order.entity';
import { Wallet } from '../typeorm/entities/wallet.entity';
import { plainToInstance } from 'class-transformer';
import { returnStudentDto } from '../users/dtos/returnStudentDto';
import { Ticket } from 'src/typeorm/entities/ticket.entity';

@Injectable()
export class OrderService extends GenericCrudService<Order> {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
    @InjectRepository(Wallet)
    private readonly walletRepository: Repository<Wallet>,
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,
  ) {
    super(orderRepository);
  }

  private mapOrderStudent(order: Order): Order {
    if (order?.student) {
      // Add explicit options to exclude non-exposed properties
      order.student = plainToInstance(returnStudentDto, order.student, {
        excludeExtraneousValues: true
      }) as unknown as Student;
    }
    return order;
  }
  private mapOrdersStudent(orders: Order[]): Order[] {
    return orders.map(this.mapOrderStudent.bind(this));
  }

  async create(orderData: OrderDto): Promise<Order> {
    const { studentNationalId, ...orderFields } = orderData;
    
    const student = await this.studentRepository.findOne({ 
      where: { nationalId: studentNationalId } as FindOptionsWhere<Student>
    });
    
    if (!student) {
      throw new NotFoundException(`Student with nationalId ${studentNationalId} not found`);
    }

    const order = await super.create({
      ...orderFields,
      student,
    });

    return this.mapOrderStudent(order);
  }

  async update(id: number, orderData: Partial<OrderDto>): Promise<Order> {
    let order: Order;

    if (orderData.studentNationalId) {
      const student = await this.studentRepository.findOne({ 
        where: { nationalId: orderData.studentNationalId } as FindOptionsWhere<Student>
      });
      
      if (!student) {
        throw new NotFoundException(`Student with nationalId ${orderData.studentNationalId} not found`);
      }

      order = await super.update(id, {
        ...orderData,
        student,
      });
    } else {
      order = await super.update(id, orderData);
    }

    return this.mapOrderStudent(order);
  }

  async getOrdersByStatus(status: Status): Promise<Order[]> {
    const orders = await this.orderRepository.find({
      where: { status },
      relations: ['student'],
      order: { createdAt: 'DESC' },
    });

    return this.mapOrdersStudent(orders);
  }

  async getStudentOrders(studentNationalId: number): Promise<Order[]> {
    const orders = await this.orderRepository.find({
      where: { student: { nationalId: studentNationalId } },
      relations: ['student'],
      order: { createdAt: 'DESC' },
    });

    return this.mapOrdersStudent(orders);
  }

  async acceptOrder(id: number): Promise<Order> {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: ['student', 'student.wallet'],
    });

    if (!order) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }

    if (order.status !== Status.WAITING) {
      throw new BadRequestException(`Order with id ${id} is not waiting`);
    }

    // Get the next available ticket number
    const lastTicket = await this.ticketRepository.findOne({
      where: {},
      select: ['ticketNumber'],
    });
    //const nextTicketNumber = lastTicket ? lastTicket.ticketNumber + 1 : 1;

    // Create tickets in a transaction
    await this.orderRepository.manager.transaction(async (transactionalEntityManager) => {
      const tickets = Array.from({ length: order.quantity }, () =>
        this.ticketRepository.create({
        })
      );

      await transactionalEntityManager.save(tickets);

      // Update wallet balance
      order.student.wallet.ticketBalance += order.quantity;
      await transactionalEntityManager.save(order.student.wallet);

      // Update order status
      order.status = Status.ACCEPTED;
      order.updatedAt = new Date();
      await transactionalEntityManager.save(order);
    });

    return this.mapOrderStudent(order);
  }
  async rejectOrder(id: number): Promise<Order> {
    const order = await this.orderRepository.findOne({ where: { id } });
  
    if (!order) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }
  
    if (order.status !== Status.WAITING) {
      throw new BadRequestException(`Order with id ${id} is not waiting`);
    }

    order.deletedAt = new Date();
    order.status = Status.DECLINED;
    await this.orderRepository.save(order);
  
    return this.mapOrderStudent(order);
  }
}
