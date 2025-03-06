import { Response } from "express";
import { toggleLike, getLikesCount } from "../application/services/LikeService";
import { RequestWithUser } from "../middlewares/authMiddleware";
import STATUS_CODES from "../shared/constants/statusCodes";
import asyncHandler from "../utils/asyncHandler";




export const toggleLikeController = asyncHandler (async (req: RequestWithUser, res: Response) => {

    const { blogPostId } = req.body;
    const userId = req.user.id;

    const result = await toggleLike(blogPostId, userId);
    res.status(STATUS_CODES.OK).json(result);

})



export const getLikesCountController = asyncHandler (async (req: RequestWithUser, res: Response) => {

    const { blogPostId } = req.params;
    const likeCount = await getLikesCount(blogPostId);

    res.status(STATUS_CODES.OK).json({ likeCount });

})