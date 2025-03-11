import { Response } from "express";
import { createBlogPost, getBlogPosts, getBlogPostById, updateBlogPost, deleteBlogPost } from "../application/services/BlogPostService";
import { RequestWithUser } from "../middlewares/authMiddleware";
import STATUS_CODES from "../shared/constants/statusCodes";
import { UploadedFile } from "express-fileupload";
import asyncHandler from "../utils/asyncHandler";




export const createBlogPostController = asyncHandler (async (req: RequestWithUser, res: Response) => {

    const { title, content } = req.body;

    const userId = req.user.id;

    if (!req.files || !req.files.image) {
      res.status(STATUS_CODES.BAD_REQUEST).json({ message: "Image is required." });
      return;
    }

    const image = req.files?.image as UploadedFile | null;
    const blogPost = await createBlogPost(title, content, userId, image);
    
    res.status(STATUS_CODES.CREATED).json({ message: "Blog post created", blogPost });

})



export const getBlogPostsController = asyncHandler (async (req: RequestWithUser, res: Response) => {

    const blogPosts = await getBlogPosts();
    
    res.status(STATUS_CODES.OK).json(blogPosts)

})



export const getBlogPostByIdController = asyncHandler (async (req: RequestWithUser, res: Response) => {

    const { blogPostId } = req.params;
    const blogPost = await getBlogPostById(blogPostId); 

    if (!blogPost) {
      res.status(STATUS_CODES.NOT_FOUND).json({ message: "Blog post not found" });
      return;
    }

    res.status(STATUS_CODES.OK).json(blogPost);
 
})



export const updateBlogPostController = asyncHandler (async (req: RequestWithUser, res: Response) => {

    const { id } = req.params;
    const { title, content } = req.body;

    const image = req.files?.image as UploadedFile | null;
    const blogPost = await updateBlogPost(id, title, content, image);
    
    res.status(STATUS_CODES.OK).json({ message: "Blog post updated", blogPost });

})



export const deleteBlogPostController = asyncHandler (async (req: RequestWithUser, res: Response) => {

    const { id } = req.params;
    await deleteBlogPost(id);

    res.status(STATUS_CODES.OK).json({ message: "Blog post deleted" });

})



