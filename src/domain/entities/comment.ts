import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from "typeorm";
import { BlogPost } from "./BlogPost";
import { User } from "./User";


@Entity()
export class Comment {
  @PrimaryGeneratedColumn("uuid")
  id : string | undefined;

  @Column()
  content: string = "";

  @ManyToOne(() => BlogPost, (blogPost) => blogPost.comments, { onDelete: "CASCADE" })
  blogPost!: BlogPost;

  @ManyToOne(() => User, (user) => user.comments, { onDelete: "CASCADE" })
  user!: User;

  @CreateDateColumn()
  createdAt!: Date;
  
} 