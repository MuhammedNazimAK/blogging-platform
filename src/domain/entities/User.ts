import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { BlogPost } from "./BlogPost";



@Entity("users")
export class User {

  @PrimaryGeneratedColumn("uuid")
  id: string | undefined;

  @Column("varchar")
  name: string | undefined;

  @Column("varchar")
  email: string | undefined;

  @Column("text")
  password: string | undefined;

  @Column("varchar", { default: "user" })
  role: string | undefined;

  @OneToMany(() => BlogPost, (blogPost) => blogPost.user)
  blogPosts: BlogPost[] | undefined;

  @CreateDateColumn()
  createdAt: Date | undefined;

  @UpdateDateColumn()
  updatedAt: Date | undefined;
  
}


