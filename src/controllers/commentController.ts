import { Response } from "express";
import { addComment, getCommentsByBlogPost, deleteComment } from "../application/services/CommentService";
import { RequestWithUser } from "../middlewares/authMiddleware";
import STATUS_CODES from "../shared/constants/statusCodes";


export const addCommentController = async (req: RequestWithUser, res: Response) => {
  try {
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

  } catch (err) {

    res.status(STATUS_CODES.BAD_REQUEST).json({ message: (err as Error).message })
  }
}


export const getCommentsByBlogPostController = async (req: RequestWithUser, res: Response) => {
  try {
    const { blogPostId } = req.params;
    const comments = await getCommentsByBlogPost(blogPostId);
    
    res.status(STATUS_CODES.OK).json(comments);

  } catch (err) {

    res.status(STATUS_CODES.BAD_REQUEST).json({ message: (err as Error).message });
  }
}



export const deleteCommentController = async (req: RequestWithUser, res: Response) => {
  try {
    const { commentId } = req.params;
    const userId = req.user.id;

    await deleteComment(commentId, userId);

    res.status(STATUS_CODES.OK).json({ message: "Comment deleted successfully." });

  } catch (err) {

    res.status(STATUS_CODES.BAD_REQUEST).json({ message: (err as Error).message });
  }
}


