// Admin.ts
import { Entity, Column } from "typeorm";
import { IsString } from "class-validator";
import { User } from "./User.abstract";

@Entity()
export class Admin extends User {
  @Column()
  @IsString()
  jobTitle: string;
}
