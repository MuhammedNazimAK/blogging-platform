import { AppDataSource } from "../../config/database";
import { Bookmark } from "../../domain/entities/Bookmark";
import { BlogPost } from "../../domain/entities/BlogPost";
import { User } from "../../domain/entities/User";


const bookmarkRepository = AppDataSource.getRepository(Bookmark);


export const toggleBookmark = async (blogPostId: string, userId: string) => {

  const blogPostRepository = AppDataSource.getRepository(BlogPost);
  const userRepository = AppDataSource.getRepository(User);

  const blogPost = await blogPostRepository.findOneBy({ id: blogPostId });
  if (!blogPost) throw new Error("Blog post not found");

  const user = await userRepository.findOneBy({ id: userId });
  if (!user) throw new Error("User not found");

  const existingBookmark = await bookmarkRepository.findOneBy({ blogPost, user });

  if (existingBookmark) {
    console.log("Found existing bookmark, removing..."); 

    await bookmarkRepository.remove(existingBookmark);
    console.log("Bookmark removed"); 

    return { message: "Bookmark removed" };
  } else {
    console.log("No existing bookmark, adding..."); 

    const bookmark = new Bookmark();
    bookmark.blogPost = blogPost;
    bookmark.user = user;

    await bookmarkRepository.save(bookmark);
    console.log("Bookmark added"); 

    return { message: "Bookmark added" };
  }
};


export const deleteBookmark = async (blogPostId: string, userId: string) => {
  const existingBookmark = await bookmarkRepository.findOneBy({ 
    user: { id: userId },
    blogPost: { id: blogPostId } 
  });

  if (!existingBookmark) {
    throw new Error("Bookmark not found");
  }

  await bookmarkRepository.remove(existingBookmark);
};


export const getBookmarksForUser = async (userId: string) => {
  const bookmarks = await bookmarkRepository.find({
    where: { id: userId },
    relations: ["blogPost"],
  });

  return bookmarks.map((bookmark) => bookmark.blogPost);
};