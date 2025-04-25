import { Router } from "express";
import { toggleBookmarkController, getUserBookmarksController, deleteBookmarkController, checkUserBookmarkedController } from "../controllers/BookmarkController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.post("/:blogPostId/bookmarks", authMiddleware, toggleBookmarkController);

router.delete("/:blogPostId/bookmarks", authMiddleware, deleteBookmarkController);

router.get("/", authMiddleware, getUserBookmarksController);

router.get("/:blogPostId/bookmarks/check", authMiddleware, checkUserBookmarkedController);

export default router;