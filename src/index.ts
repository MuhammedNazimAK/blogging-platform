import 'dotenv/config';
import "reflect-metadata";
import express from "express";
import fileUpload from 'express-fileupload';
import cors from "cors";
import { AppDataSource } from "./config/database";
import { initializeSearch } from './application/services/searchService';
import authRoutes from "./routes/authRoutes";
import blogPostRoutes from "./routes/blogPostRoutes";
import commentRoutes from "./routes/commentRoutes";
import likeRoutes from "./routes/likeRoutes";
import searchRoutes from "./routes/searchRoutes";
import bookmarkRoutes from "./routes/BookmarkRoutes";


const app = express();


app.use(
  fileUpload({
    createParentPath: true,
    useTempFiles: true,
    tempFileDir: "/tmp/",
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  })
);


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/auth", authRoutes);
app.use("/blogposts", blogPostRoutes);
app.use("/comments", commentRoutes);
app.use("/likes", likeRoutes);
app.use("/search", searchRoutes);
app.use("/bookmarks", bookmarkRoutes);



AppDataSource.initialize().then(async () => {
  await initializeSearch();
  console.log("Database connected");

  app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
  
}).catch(error => console.log(error));

