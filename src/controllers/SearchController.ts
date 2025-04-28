import { Response } from "express";
import { RequestWithUser } from "../middlewares/authMiddleware";
import { searchBlogPosts } from "../application/services/searchService";
import STATUS_CODES from "../shared/constants/statusCodes";
import asyncHandler from "../utils/asyncHandler";




export const searchController = asyncHandler (async (req: RequestWithUser, res: Response) => {

    const { q } = req.query; 

    if (!q || typeof q !== 'string') { 
      res.status(STATUS_CODES.BAD_REQUEST).json({ message: "Query is required" });
      return;
    }

    const blogPosts = await searchBlogPosts(q as string);

    res.status(STATUS_CODES.OK).json(blogPosts);

});


