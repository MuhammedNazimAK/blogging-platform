import { Response } from "express";
import { createBlogPost, getBlogPosts, updateBlogPost, deleteBlogPost } from "../application/services/BlogPostService";
import { RequestWithUser } from "../middlewares/authMiddleware";
import STATUS_CODES from "../shared/constants/statusCodes";



export const createBlogPostController = async (req: RequestWithUser, res: Response) => {
  try {

    const { title, content } = req.body;
    const userId = req.user.id;
    const blogPost = await createBlogPost(title, content, userId);
    
    res.status(STATUS_CODES.CREATED).json({ message: "Blog post created", blogPost });

  } catch (error) {

    res.status(STATUS_CODES.BAD_REQUEST).json({ messge: (error as Error).message });
  }
}



export const getBlogPostsController = async (req: RequestWithUser, res: Response) => {
  try {
    const blogPosts = await getBlogPosts();
    
    res.status(STATUS_CODES.OK).json(blogPosts)
  } catch (error) {

    res.status(STATUS_CODES.INTERNAL_SERVER_SERVER).json({ message: (error as Error).message });
  }
}



export const updateBlogPostController = async (req: RequestWithUser, res: Response) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const blogPost = await updateBlogPost(id, title, content);
    
    res.status(STATUS_CODES.OK).json({ message: "Blog post updated", blogPost });

  } catch (error) { 
      
    res.status(STATUS_CODES.BAD_REQUEST).json({ message: (error as Error).message });
  }
}



export const deleteBlogPostController = async (req: RequestWithUser, res: Response) => {
  try {

    const { id } = req.params;
    await deleteBlogPost(id);

    res.status(STATUS_CODES.OK).json({ message: "Blog post deleted" });
  }  catch (error) {
    
    res.status(STATUS_CODES.BAD_REQUEST).json({ message: (error as Error).message });
  }
}



