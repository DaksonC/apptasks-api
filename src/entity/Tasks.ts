import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Users } from "./Users";

@Entity()
export class Tasks {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ default: false })
  finished: boolean;

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  updated_at: Date;

  @ManyToMany(() => Users, users => users.tasks)
  @JoinTable({
    name: "users_tasks",
    joinColumn: {
      name: "task_id",
      referencedColumnName: "id"
    },
    inverseJoinColumn: {
      name: "user_id",
      referencedColumnName: "id"
    }
  })
  users: Users[];

}