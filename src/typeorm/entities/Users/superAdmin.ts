import { Entity } from 'typeorm';
import { Admin } from './Admin';
@Entity()
export class SuperAdmin extends Admin {}
