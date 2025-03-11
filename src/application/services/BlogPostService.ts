import cloudinary from "../../config/cloudinary";
import { AppDataSource } from "../../config/database";
import { BlogPost } from "../../domain/entities/BlogPost";
import { User } from "../../domain/entities/User";
import { UploadedFile } from "express-fileupload";


const blogPostRepository = AppDataSource.getRepository(BlogPost);


export const createBlogPost = async (title: string, content: string, userId: string, image: UploadedFile | null) => {

  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOneBy({ id: userId });

  if (!user) throw new Error("User not found");

  let imageUrl: string = "";

  if (image) {
    const uploadResponse = await cloudinary.uploader.upload(image.tempFilePath, {
      folder: "blog_posts",
      fetch_format: 'auto',
      quality: 'auto',
    });

    imageUrl = uploadResponse.secure_url;
  }

  const blogPost = new BlogPost();
  blogPost.title = title;
  blogPost.content = content;
  blogPost.user = user;
  blogPost.imageUrl = imageUrl;

  return blogPostRepository.save(blogPost);

}



export const getBlogPosts = async () => {
  return blogPostRepository.find({ relations: ["user"] });
};



export const getBlogPostById = async (blogPostId: string) => {
  const blogPost = await blogPostRepository.findOne({
    where: { id: blogPostId },
    relations: ["user"]
  });

  if (!blogPost) {
    throw new Error("Blog post not found");
  }

  return blogPost;
};



export const updateBlogPost = async (id: string, title: string, content: string, image: UploadedFile | null) => {
  const blogPost = await blogPostRepository.findOneBy({ id });

  if (!blogPost) throw new Error("Blog post not found");

  if (image) {
    // Delete the old image if it exists 
    if (blogPost.imageUrl) {
      const publicId = getPublicIdFromCloudinaryUrl(blogPost.imageUrl);
      if (publicId) {
        await cloudinary.uploader.destroy(`blog_posts/${publicId}`);
      }
    }

    const uploadResponse = await cloudinary.uploader.upload(image.tempFilePath, {
      folder: "blog_posts"
    });

    blogPost.imageUrl = uploadResponse.secure_url;
  }

  blogPost.title = title;
  blogPost.content = content;

  return blogPostRepository.save(blogPost);

};



function getPublicIdFromCloudinaryUrl(imageUrl: string): string | null {
  const parts = imageUrl.split('/');
  const publicIdIndex = parts.indexOf("blog_posts") + 1;
  if (publicIdIndex > 0 && publicIdIndex < parts.length) {
    return parts[publicIdIndex].split('.')[0];
  }
  return null;
}


export const deleteBlogPost = async (id: string) => {
  const blogPost = await blogPostRepository.findOneBy({ id });

  if (!blogPost) throw new Error("Blog Post not found");

  return blogPostRepository.remove(blogPost);
}

