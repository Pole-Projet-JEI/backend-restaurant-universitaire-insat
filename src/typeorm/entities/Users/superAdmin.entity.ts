import { Entity } from "typeorm";
import { Admin } from "./Admin.entity";

@Entity()
export class SuperAdmin extends Admin {}
