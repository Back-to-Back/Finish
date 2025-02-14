
import { Link } from "react-router-dom";

export interface Post {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  category: string;
  imageUrl: string;
}

interface PostCardProps {
  post: Post;
}

const PostCard = ({ post }: PostCardProps) => {
  return (
    <Link to={`/post/${post.id}`} className="block">
      <article className="post-card">
        <img
          src={post.imageUrl}
          alt={post.title}
          className="w-full h-48 object-cover rounded-md mb-4"
        />
        <div className="space-y-2">
          <span className="text-sm text-primary">{post.category}</span>
          <h2 className="text-xl font-semibold">{post.title}</h2>
          <p className="text-gray-600">{post.excerpt}</p>
          <div className="flex justify-between items-center text-sm text-gray-500">
            <span>{post.author}</span>
            <span>{post.date}</span>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default PostCard;
