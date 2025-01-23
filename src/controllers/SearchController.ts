import { Response } from "express";
import { RequestWithUser } from "../middlewares/authMiddleware";
import { searchBlogPosts } from "../application/services/searchService";
import STATUS_CODES from "../shared/constants/statusCodes";


export const searchController = async (req: RequestWithUser, res: Response) => {
  try {

    const { query } = req.query; 

    if (!query || typeof query !== 'string') { 
      return res.status(STATUS_CODES.BAD_REQUEST).json({ message: "Query is required" });
    }

    const blogPosts = await searchBlogPosts(query as string);

    console.log(blogPosts)
    res.status(STATUS_CODES.OK).json(blogPosts);

  } catch (err) {

    res.status(STATUS_CODES.INTERNAL_SERVER_SERVER).json({ message: (err as Error).message });
  }
}


