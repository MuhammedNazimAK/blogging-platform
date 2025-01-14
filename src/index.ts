import 'dotenv/config';
import "reflect-metadata";
import express from "express";
import cors from "cors";
import { AppDataSource } from "./config/database";
import authRoutes from "./routes/authRoutes";
import blogPostRoutes from "./routes/blogPostRoutes";


const app = express();

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }));


app.use("/auth", authRoutes);
app.use("/blogposts", blogPostRoutes);


AppDataSource.initialize().then(() => {
  console.log("Database connected");

  app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
  
}).catch(error => console.log(error));

