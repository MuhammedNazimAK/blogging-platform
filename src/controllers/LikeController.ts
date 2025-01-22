import { Response } from "express";
import { toggleLike, getLikesCount } from "../application/services/LikeService";
import { RequestWithUser } from "../middlewares/authMiddleware";
import STATUS_CODES from "../shared/constants/statusCodes";


export const toggleLikeController = async (req: RequestWithUser, res: Response) => {
  try {
    const { blogPostId } = req.body;
    const userId = req.user.id;

    const result = await toggleLike(blogPostId, userId);
    res.status(STATUS_CODES.OK).json(result);

  } catch (err) {

    res.status(STATUS_CODES.BAD_REQUEST).json({ message: (err as Error).message });
  }
}


export const getLikesCountController = async (req: RequestWithUser, res: Response) => {
  try {
    const { blogPostId } = req.params;
    const likeCount = await getLikesCount(blogPostId);

    res.status(STATUS_CODES.OK).json({ likeCount });
    
  } catch (err) {
    
    res.status(STATUS_CODES.BAD_REQUEST).json({ message: (err as Error).message });
  }
}