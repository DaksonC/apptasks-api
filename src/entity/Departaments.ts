import { Column, CreateDateColumn, Entity, JoinTable, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Users } from "./Users";

@Entity()
export class Departaments {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  updated_at: Date;

  @OneToMany(() => Users, users => users.department)
  users: Users[];
}