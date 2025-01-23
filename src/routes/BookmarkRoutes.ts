import { Router } from "express";
import { toggleBookmarkController, getUserBookmarksController, deleteBookmakController } from "../controllers/BookmarkController";
import { authMiddleware } from "../middlewares/authMiddleware";


const router = Router();


router.post("/", authMiddleware, toggleBookmarkController);
router.delete("/:blogPostId", authMiddleware, deleteBookmakController);
router.get("/", authMiddleware, getUserBookmarksController);

export default router;

