import { Entity, PrimaryGeneratedColumn, ManyToOne, Unique } from "typeorm";
import { BlogPost } from "./BlogPost";
import { User } from "./User";


@Entity()
@Unique(["user", "blogPost"])
export class Like {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => BlogPost, (blogPost) => blogPost.likes, { onDelete: "CASCADE" })
  blogPost!: BlogPost;

  @ManyToOne(() => User, (user) => user.likes, { onDelete: "CASCADE" })
  user!: User;  

}