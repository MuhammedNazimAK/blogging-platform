import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from "typeorm";
import { User } from "./User";


@Entity()
export class Notification {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  message!: string;

  @Column({ default: false })
  isRead!: boolean;

  @CreateDateColumn()
  createedAt!: Date;

  @ManyToOne(() => User, (user) => user.notifications, { onDelete: "CASCADE" })
  recipient!: User;
  
}