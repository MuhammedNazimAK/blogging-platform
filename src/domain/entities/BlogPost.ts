import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from "typeorm";
import { User } from "./User";


@Entity("blog_posts")
export class BlogPost {

  @PrimaryGeneratedColumn("uuid")
  id: string | undefined;

  @ManyToOne(() => User, (user) => user.blogPosts)
  user: User | undefined;

  @Column("varchar")
  title: string | undefined;

  @Column("text")
  content: string | undefined;

  @Column("varchar", { default: false })
  published: boolean | undefined;

  @CreateDateColumn()
  createdAt: Date | undefined;

  @UpdateDateColumn()
  updatedAt: Date | undefined;

}

