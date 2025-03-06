import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { BlogPost } from "./BlogPost";
import { Comment } from "./comment";
import { Like } from "./Like";
import { Bookmark } from "./Bookmark";



@Entity("users")
export class User {

  @PrimaryGeneratedColumn("uuid")
  id: string | undefined;

  @Column("varchar")
  name: string | undefined;

  @Column({type:"varchar", unique: true, nullable: false })
  email!: string;

  @Column({type:"varchar", length: 60 })
  password!: string;

  @Column("varchar", { default: "user" })
  role: string | undefined;

  @OneToMany(() => BlogPost, (blogPost) => blogPost.user)
  blogPosts: BlogPost[] | undefined;

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[] | undefined;

  @OneToMany(() => Like, (like) => like.user)
  likes!: Like[];

  @OneToMany(() => Bookmark, (bookmark) => bookmark.user)
  bookmarks!: Bookmark;

  @CreateDateColumn()
  createdAt: Date | undefined;

  @UpdateDateColumn()
  updatedAt: Date | undefined;
  
}

