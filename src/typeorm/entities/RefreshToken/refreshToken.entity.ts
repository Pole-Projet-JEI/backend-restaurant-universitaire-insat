import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { TimeStamp } from "../timeStamp.abstract";
import { IsDate, IsString } from "class-validator";

@Entity()
export class RefreshToken extends TimeStamp {
  @IsString()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @IsString()
  @Column()
  refreshToken: string;

  @IsString()
  @Column()
  userNationalId: number;

  @IsDate()
  @Column({ type: "timestamp" })
  expiresAt: Date; // would be more longer that the access token
}
