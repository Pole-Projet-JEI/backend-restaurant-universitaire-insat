// Admin.ts
import { Entity, TableInheritance, Column } from 'typeorm';
import { IsString } from 'class-validator';
import { User} from './User';

@Entity()
export class Admin extends User {
  @Column()
  @IsString()
  jobTitle: string;
}
