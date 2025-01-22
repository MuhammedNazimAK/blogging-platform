import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from "typeorm";
import { User } from "./User";
import { Comment } from "./comment";
import { Like } from "./Like";


@Entity("blog_posts")
export class BlogPost {

  @PrimaryGeneratedColumn("uuid")
  id: string | undefined;

  @ManyToOne(() => User, (user) => user.blogPosts, { eager: true })
  user: User | undefined;

  @Column("varchar")
  title: string | undefined;

  @Column("text")
  content: string | undefined;

  @Column({ type: "varchar", nullable: true })
  imageUrl: string | undefined; 

  @OneToMany(() => Comment, (comment) => comment.blogPost, { cascade: true })
  comments: Comment[] | undefined;

  @OneToMany(() => Like, (like) => like.blogPost)
  likes!: Like[]

  @Column("int", { default: 0 })
  commentCount: number | undefined

  @Column("varchar", { default: false })
  published: boolean | undefined;

  @CreateDateColumn()
  createdAt: Date | undefined;

  @UpdateDateColumn()
  updatedAt: Date | undefined;

}

  