import 'dotenv/config';
import "reflect-metadata";
import express from "express";
import fileUpload from 'express-fileupload';
import cors from "cors";
import { AppDataSource } from "./config/database";
import authRoutes from "./routes/authRoutes";
import blogPostRoutes from "./routes/blogPostRoutes";
import commentRoutes from "./routes/commentRoutes";
import likeRoutes from "./routes/likeRoutes";




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


AppDataSource.initialize().then(() => {
  console.log("Database connected");

  app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
  
}).catch(error => console.log(error));

