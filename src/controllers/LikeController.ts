import { Response } from "express";
import { toggleLike, getLikesCount, checkUserLiked } from "../application/services/LikeService";
import { RequestWithUser } from "../middlewares/authMiddleware";
import STATUS_CODES from "../shared/constants/statusCodes";
import asyncHandler from "../utils/asyncHandler";




export const toggleLikeController = asyncHandler(async (req: RequestWithUser, res: Response) => {

    console.log('reached blog like')

    const blogPostId = req.params.blogPostId || req.body.blogPostId;
    const userId = req.user.id;
    
    const result = await toggleLike(blogPostId, userId);
    res.status(STATUS_CODES.OK).json(result);
});



export const getLikesCountController = asyncHandler(async (req: RequestWithUser, res: Response) => {
    const { blogPostId } = req.params;
    const likeCount = await getLikesCount(blogPostId);
    
    res.status(STATUS_CODES.OK).json({ likeCount });
});



export const checkUserLikedController = asyncHandler(async (req: RequestWithUser, res: Response) => {
    const { blogPostId } = req.params;
    const userId = req.user.id;
    
    const hasLiked = await checkUserLiked(blogPostId, userId);
    res.status(STATUS_CODES.OK).json(hasLiked);
});



