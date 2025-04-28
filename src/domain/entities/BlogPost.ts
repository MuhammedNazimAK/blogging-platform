import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from "typeorm";
import { User } from "./User";
import { Comment } from "./comment";
import { Like } from "./Like";
import { Bookmark } from "./Bookmark";


@Entity("blog_posts")
export class BlogPost {

  @PrimaryGeneratedColumn("uuid")
  id: string | undefined;

  @ManyToOne(() => User, (user) => user.blogPosts, { eager: true })
  user!: User;

  @Column("varchar")
  title: string | undefined;

  @Column("text")
  content: string | undefined;

  @Column({ nullable: true })
  excerpt!: string;

  @Column({ type: "varchar", nullable: true })
  imageUrl: string | undefined; 

  @Column({ nullable: true })
  readTime!: number;

  @OneToMany(() => Comment, (comment) => comment.blogPost, { cascade: true })
  comments: Comment[] | undefined;

  @OneToMany(() => Like, (like) => like.blogPost)
  likes!: Like[];

  @OneToMany(() => Bookmark, (bookmark) => bookmark.blogPost)
  bookmarks!: Bookmark[];

  @Column("int", { default: 0 })
  commentCount: number | undefined;

  @Column({ default: 0 })
  views!: number;

  @Column("boolean", { default: false })
  published: boolean | undefined;

  @CreateDateColumn()
  createdAt: Date | undefined;

  @UpdateDateColumn()
  updatedAt: Date | undefined;

}

