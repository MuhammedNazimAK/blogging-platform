import { Response } from "express";
import { addComment, getCommentsByBlogPost, deleteComment } from "../application/services/CommentService";
import { RequestWithUser } from "../middlewares/authMiddleware";
import STATUS_CODES from "../shared/constants/statusCodes";
import asyncHandler from "../utils/asyncHandler";




export const addCommentController = asyncHandler (async (req: RequestWithUser, res: Response) => {

    const { content, blogPostId } = req.body;
    const userId = req.user.id;

    const comment = await addComment(content, blogPostId, userId);

    const formattedComment = {
      content: comment.content,
      user: { name: comment.user.name },
      blogPostId: comment.blogPost.id,
      createdAt: comment.createdAt,
    }

    res.status(STATUS_CODES.CREATED).json({ message: "Comment added", comment: formattedComment });

})



export const getCommentsByBlogPostController = asyncHandler (async (req: RequestWithUser, res: Response) => {

    const { blogPostId } = req.params;
    const comments = await getCommentsByBlogPost(blogPostId);
    
    res.status(STATUS_CODES.OK).json(comments);

})



export const deleteCommentController = asyncHandler (async (req: RequestWithUser, res: Response) => {

    const { commentId } = req.params;
    const userId = req.user.id;

    await deleteComment(commentId, userId);

    res.status(STATUS_CODES.OK).json({ message: "Comment deleted successfully." });

})


