import { AppDataSource } from "../../config/database";
import { BlogPost } from "../../domain/entities/BlogPost";
import { User } from "../../domain/entities/User";


const blogPostRepository = AppDataSource.getRepository(BlogPost);


export const createBlogPost = async (title: string, content: string, userId: string) => {
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOneBy({ id: userId });

  if (!user) throw new Error("User not found");

  const blogPost = new BlogPost();
  blogPost.title = title;
  blogPost.content = content;
  blogPost.user = user;

  return blogPostRepository.save(blogPost);

}

export const getBlogPosts = async () => {
  return blogPostRepository.find({ relations: ["user"] });
};



export const updateBlogPost = async (id: string, title: string, content: string) => {
  const blogPost = await blogPostRepository.findOneBy({ id });

  if (!blogPost) throw new Error("Blog post not found");

  blogPost.title = title;
  blogPost.content = content;

  return blogPostRepository.save(blogPost);

};



export const deleteBlogPost = async (id: string) => {
  const blogPost = await blogPostRepository.findOneBy({ id });

  if (!blogPost) throw new Error("Blog Post not found");

  return blogPostRepository.remove(blogPost);
}

