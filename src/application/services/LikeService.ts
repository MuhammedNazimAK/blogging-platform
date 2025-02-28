import { AppDataSource } from "../../config/database";
import { Like } from "../../domain/entities/Like";
import { BlogPost } from "../../domain/entities/BlogPost";
import { User } from "../../domain/entities/User";


const likeRepository = AppDataSource.getRepository(Like);


export const toggleLike = async (blogPostId: string, userId: string) => {
  const blogPostRepository = await AppDataSource.getRepository(BlogPost);
  const userRepository = await AppDataSource.getRepository(User);

  const blogPost = await blogPostRepository.findOneBy({ id: blogPostId });
  if (!blogPost) throw new Error("Blog post not found");

  const user = await userRepository.findOneBy({ id: userId });
  if (!user) throw new Error("User not found");

  const existingLike = await likeRepository.findOne({
    where: {
      blogPost: { id: blogPostId },
      user: { id: userId }
    }
  });

  let message = "";
  if (existingLike) {
    await likeRepository.remove(existingLike);

    message = "Unliked the post";
  } else {

    const like = new Like();
    like.blogPost = blogPost;
    like.user = user;

    await likeRepository.save(like);
    message = "Liked the post";
  }

}


export const getLikesCount = async (blogPostId: string) => {
    const likeCount = await likeRepository.count({
      where: { blogPost: { id: blogPostId } },
    });

    return likeCount;
}


