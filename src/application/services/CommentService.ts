import { AppDataSource } from "../../config/database";
import { BlogPost } from "../../domain/entities/BlogPost";
import { Comment } from "../../domain/entities/comment";
import { User } from "../../domain/entities/User";



const commentRepository = AppDataSource.getRepository(Comment);


export const addComment = async (content: string, blogPostId: string, userId: string) => {

  const blogPostRepository = AppDataSource.getRepository(BlogPost);
  const userRepository = AppDataSource.getRepository(User);

  const blogPost = await blogPostRepository.findOneBy({ id: blogPostId });
  if (!blogPost) throw new Error("Blog post now found");

  const user = await userRepository.findOneBy({ id: userId });
  if (!user) throw new Error("User not found");

  const comment = new Comment()
  comment.content = content;
  comment.blogPost = blogPost;
  comment.user = user;

  await blogPostRepository.increment({ id: blogPostId }, "commentCount", 1);

  await commentRepository.save(comment);

  return comment;
}



export const getCommentsByBlogPost = async (blogPostId: string) => {
  return commentRepository.find({
    where: { blogPost: { id: blogPostId } },
    relations: ["user"],
    order: { createdAt: "DESC" },
  });
};


4

export const deleteComment = async (commentId: string, userId: string) => {

  const blogPostRepository = AppDataSource.getRepository(BlogPost)
  const comment = await commentRepository.findOne({ 
    where: { id: commentId },
    relations: ["user", "blogPost"],
    select: {
      user: { id: true },
      blogPost: { id: true },
    }
   });

   if (!comment) throw new Error("Comment not found");
   if (comment.user.id !== userId) throw new Error("Unauthorized");

   console.log(comment)

   await blogPostRepository.decrement({ id: comment.blogPost.id }, "commentCount", 1);

   return commentRepository.remove(comment);
}









