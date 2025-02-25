import { ChildEntity } from 'typeorm';
import { Admin } from './Admin';
import { UserRole } from './User';

@ChildEntity(UserRole.SUPERADMIN)
export class SuperAdmin extends Admin {}
