import { DataSource } from "typeorm";
import { User } from "../domain/entities/User";
import { config } from "dotenv";
import { BlogPost } from "../domain/entities/BlogPost";
import { Comment } from "../domain/entities/comment";
import { Like } from "../domain/entities/Like";
import { Bookmark } from "../domain/entities/Bookmark";
config()


export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "5432"),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  logging: true,
  entities: [User, BlogPost, Comment, Like, Bookmark],
  ssl: false,
});


AppDataSource.initialize()
.then(() => console.log("Database connected successfully"))
.catch((err) => console.log("Error connecting to the database:", err));
