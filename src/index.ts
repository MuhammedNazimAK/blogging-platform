import 'dotenv/config';
import "reflect-metadata";
import express from "express";
import fileUpload from 'express-fileupload';
import cors from "cors";
import { AppDataSource } from "./config/database";
import authRoutes from "./routes/authRoutes";
import blogPostRoutes from "./routes/blogPostRoutes";




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


AppDataSource.initialize().then(() => {
  console.log("Database connected");

  app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
  
}).catch(error => console.log(error));

