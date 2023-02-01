import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Departaments } from "./Departaments";
import { Tasks } from "./Tasks";

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text", nullable: true })
  name: string;

  @Column({ type: "text", nullable: true })
  email: string;

  @Column({ type: "text", nullable: true })
  password: string;

  @ManyToOne(() => Departaments, departaments => departaments.users)
  @JoinColumn({ name: "department_id" })
  department: Departaments;

  @ManyToMany(() => Tasks, tasks => tasks.users)
  tasks: Tasks[];

}