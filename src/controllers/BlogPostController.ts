import { Response } from "express";
import { createBlogPost, getBlogPosts, getBlogPostById, updateBlogPost, deleteBlogPost } from "../application/services/BlogPostService";
import { RequestWithUser } from "../middlewares/authMiddleware";
import STATUS_CODES from "../shared/constants/statusCodes";
import { UploadedFile } from "express-fileupload";



export const createBlogPostController = async (req: RequestWithUser, res: Response) => {
  try {

    const { title, content } = req.body;
    const userId = req.user.id;

    if (!req.files || !req.files.image) {
      res.status(STATUS_CODES.BAD_REQUEST).json({ message: "Image is required." });
      return;
    }

    const image = req.files?.image as UploadedFile | null;
    const blogPost = await createBlogPost(title, content, userId, image);
    
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


export const getBlogPostByIdController = async (req: RequestWithUser, res: Response) => {
  try {
    const { blogPostId } = req.params;
    const blogPost = await getBlogPostById(blogPostId); 

    if (!blogPost) {
      return res.status(STATUS_CODES.NOT_FOUND).json({ message: "Blog post not found" });
    }

    res.status(STATUS_CODES.OK).json(blogPost);
  } catch (error) {
    res.status(STATUS_CODES.INTERNAL_SERVER_SERVER).json({ message: (error as Error).message });
  }
};



export const updateBlogPostController = async (req: RequestWithUser, res: Response) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    const image = req.files?.image as UploadedFile | null;
    const blogPost = await updateBlogPost(id, title, content, image);
    
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



