import { User } from './entities/Users/User';
import { Student } from './entities/Users/Student';
import { Order } from './entities/order';
import { DayMenu } from './entities/Restaurant/dayMenu';
import { Dish } from './entities/Restaurant/dish';
import { WeekMenu } from './entities/Restaurant/weekMenu';
import { Admin } from './entities/Users/Admin';
import { SuperAdmin } from './entities/Users/superAdmin';
import { QrCode } from './entities/qrCode';
import { Ticket } from './entities/ticket';
import { TimeStamp } from './entities/timeStamp';
import { Transfert } from './entities/transfer';
import { Wallet } from './entities/wallet';

export const entities = [
  User,
  Student,
  Admin,
  SuperAdmin,
  DayMenu,
  Dish,
  WeekMenu,
  Order,
  QrCode,
  Ticket,
  TimeStamp,
  Transfert,
  Wallet,
];
