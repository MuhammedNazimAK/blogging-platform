import { Response } from "express";
import { RequestWithUser } from "../middlewares/authMiddleware";
import { getBookmarksForUser, toggleBookmark, deleteBookmark } from "../application/services/BookmarkService";
import STATUS_CODES from "../shared/constants/statusCodes";


export const toggleBookmarkController = async (req: RequestWithUser, res: Response) => {
  try {
    const { blogPostId } = req.body;
    const userId = req.user.id;

    const result = await toggleBookmark(blogPostId, userId);
    res.status(STATUS_CODES.OK).json(result);

  } catch (err) {

    res.status(STATUS_CODES.BAD_REQUEST).json({ message: (err as Error).message });
  }
};


export const getUserBookmarksController = async (req: RequestWithUser, res: Response) => {
  try {
    const userId = req.user.id;

    const bookmarks = await getBookmarksForUser(userId);
    res.status(STATUS_CODES.OK).json(bookmarks);

  } catch (err) {

    res.status(STATUS_CODES.BAD_REQUEST).json({ message: (err as Error).message });
  }
};

export const deleteBookmakController = async (req: RequestWithUser, res: Response) => {
  try {
    const { blogPostId } = req.params;
    const userId = req.user.id;

    await deleteBookmark(blogPostId, userId);
    res.status(STATUS_CODES.OK).json({ message: "Bookmark removed successfully" });

  } catch (err) {

    res.status(STATUS_CODES.BAD_REQUEST).json({ message: (err as Error).message });
  }
};
