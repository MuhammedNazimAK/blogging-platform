import { Entity, PrimaryGeneratedColumn, ManyToOne, Unique } from "typeorm";
import { User } from "./User";
import { BlogPost } from "./BlogPost";


@Entity()
@Unique(["user", "blogPost"])
export class Bookmark {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => User, (user) => user.bookmarks, { onDelete: "CASCADE" })
  user!: User;

  @ManyToOne(() => BlogPost, (blogPost) => blogPost.bookmarks, { onDelete: "CASCADE" })
  blogPost!: BlogPost;

}

