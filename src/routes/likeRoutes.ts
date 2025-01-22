import { Router } from "express";
import { toggleLikeController, getLikesCountController } from "../controllers/LikeController";
import { authMiddleware } from "../middlewares/authMiddleware";


const router = Router();

router.post("/", authMiddleware, toggleLikeController);
router.get("/:blogPostId", getLikesCountController);


export default router;