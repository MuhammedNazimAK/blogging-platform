import { Trie } from "../../utils/Trie";
import { AppDataSource } from "../../config/database";
import { BlogPost } from "../../domain/entities/BlogPost";
import { In } from "typeorm";


const blogPostRepository = AppDataSource.getRepository(BlogPost);
const trie = new Trie();


export const initializeSearch = async () => {

  const blogPosts = await blogPostRepository.find();
  blogPosts.forEach((post) => {

    if (post.title && post.id) {

      const postId = post.id;
      const words = post.title.toLowerCase().split(" ");

      words.forEach(word => {
        
        trie.insert(word, postId)
      })

    } else {

      console.error("Error: Blog post is missing an ID", post); 
    }
  });
};

  
export const searchBlogPosts = async (prefix: string) => {
  const blogPostIds = trie.search(prefix);
  const blogposts = await blogPostRepository.findBy({
    id: In(blogPostIds)
  });

  return blogposts;
}



