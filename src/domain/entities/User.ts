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

  @Column("varchar")
  email: string | undefined;

  @Column("text")
  password: string | undefined;

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

