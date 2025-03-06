import { Response } from "express";
import { RequestWithUser } from "../middlewares/authMiddleware";
import { getBookmarksForUser, toggleBookmark, deleteBookmark } from "../application/services/BookmarkService";
import STATUS_CODES from "../shared/constants/statusCodes";
import asyncHandler from "../utils/asyncHandler";




export const toggleBookmarkController = asyncHandler (async (req: RequestWithUser, res: Response) => {

    const { blogPostId } = req.body;
    const userId = req.user.id;

    const result = await toggleBookmark(blogPostId, userId);
    res.status(STATUS_CODES.OK).json(result);

})



export const getUserBookmarksController = asyncHandler (async (req: RequestWithUser, res: Response) => {

    const userId = req.user.id;

    const bookmarks = await getBookmarksForUser(userId);
    res.status(STATUS_CODES.OK).json(bookmarks);

})



export const deleteBookmakController = asyncHandler (async (req: RequestWithUser, res: Response) => {

    const { blogPostId } = req.params;
    const userId = req.user.id;

    await deleteBookmark(blogPostId, userId);
    res.status(STATUS_CODES.OK).json({ message: "Bookmark removed successfully" });

})
