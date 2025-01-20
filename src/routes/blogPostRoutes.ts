import { Router } from "express";
import { createBlogPostController, getBlogPostsController, updateBlogPostController, deleteBlogPostController } from "../controllers/BlogPostController";
import { authMiddleware } from "../middlewares/authMiddleware";
import fileUpload from "express-fileupload";


const router = Router();


router.post("/", authMiddleware, createBlogPostController);
router.get("/", getBlogPostsController);
router.put("/:id", authMiddleware, updateBlogPostController);
router.delete("/:id", authMiddleware, deleteBlogPostController);


export default router;