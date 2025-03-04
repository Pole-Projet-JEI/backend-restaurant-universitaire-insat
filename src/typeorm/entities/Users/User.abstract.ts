import { PrimaryColumn, Column } from "typeorm";
import { IsInt, IsString, IsEmail, Length, IsEnum } from "class-validator";
import { TimeStamp } from "../timeStamp.abstract";

export enum UserRole {
  STUDENT = "student",
  ADMIN = "admin",
  SUPERADMIN = "superadmin",
}

export abstract class User extends TimeStamp {
  @PrimaryColumn({ unique: true })
  @IsInt()
  nationalId: number;

  @Column()
  @IsString()
  firstName: string;

  @Column()
  @IsString()
  lastName: string;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column()
  @IsString()
  @Length(6, 250)
  passwordHash: string;

  @Column({ type: "enum", enum: UserRole, default: UserRole.STUDENT })
  @IsEnum(UserRole)
  role: UserRole;
}
