import { Router } from "express";
import { createBlogPostController, getBlogPostsController, updateBlogPostController, deleteBlogPostController, getBlogPostByIdController } from "../controllers/BlogPostController";
import { authMiddleware } from "../middlewares/authMiddleware";


const router = Router();


router.post("/", authMiddleware, createBlogPostController);
router.get("/", getBlogPostsController);
router.get("/:id", getBlogPostByIdController)
router.put("/:id", authMiddleware, updateBlogPostController);
router.delete("/:id", authMiddleware, deleteBlogPostController);


export default router;