import { Router } from "express";
import { toggleLikeController, getLikesCountController, checkUserLikedController } from "../controllers/LikeController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.post("/:blogPostId/likes", authMiddleware, toggleLikeController);

router.delete("/:blogPostId/likes", authMiddleware, toggleLikeController);

router.get("/:blogPostId/likes", getLikesCountController);

router.get("/:blogPostId/likes/check", authMiddleware, checkUserLikedController);

export default router;