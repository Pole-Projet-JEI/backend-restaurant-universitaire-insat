import { IsInt, IsString } from "class-validator";
import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class QrCode extends BaseEntity {
  @PrimaryColumn()
  @IsInt()
  userId: number;

  @Column({ unique: true })
  @IsString()
  code: string;
}
