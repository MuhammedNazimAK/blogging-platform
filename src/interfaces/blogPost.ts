import { UploadedFile } from "express-fileupload";

export interface CreateBlogPostDTO {
  title: string;
  content: string;
  excerpt?: string;
  image?: UploadedFile | null;
  userId: string;
}

export interface BlogPostResponse {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  imageUrl: string;
  author: {
    id: string;
    name: string;
  } | null;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  published: boolean;
  readTime: number;
  likes: number;
  views: number;
}