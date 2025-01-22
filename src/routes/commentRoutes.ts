import { Router } from "express";
import { addCommentController, getCommentsByBlogPostController, deleteCommentController } from "../controllers/commentController";
import { authMiddleware } from "../middlewares/authMiddleware";


const router = Router();


router.post("/", authMiddleware, addCommentController);
router.get("/:blogpostId", getCommentsByBlogPostController);
router.delete("/:commentId", authMiddleware, deleteCommentController);


export default router;