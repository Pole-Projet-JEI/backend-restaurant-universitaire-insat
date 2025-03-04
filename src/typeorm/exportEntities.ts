import { User } from "./entities/Users/User.abstract";
import { Student } from "./entities/Users/Student.entity";
import { Order } from "./entities/order.entity";
import { DayMenu } from "./entities/Restaurant/dayMenu.entity";
import { Dish } from "./entities/Restaurant/dish.entity";
import { WeekMenu } from "./entities/Restaurant/weekMenu.entity";
import { Admin } from "./entities/Users/Admin.entity";
import { SuperAdmin } from "./entities/Users/superAdmin.entity";
import { QrCode } from "./entities/qrCode.entity";
import { Ticket } from "./entities/ticket.entity";
import { TimeStamp } from "./entities/timeStamp.abstract";
import { Transfert } from "./entities/transfer.entity";
import { Wallet } from "./entities/wallet.entity";
import { RefreshToken } from "./entities/RefreshToken/refreshToken.entity";

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
  RefreshToken,
];
