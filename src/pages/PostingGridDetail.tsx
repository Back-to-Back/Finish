import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

interface Author {
  username: string;
  email: string;
}

interface Post {
  _id: string;
  title: string;
  content: string;
  image?: string;
  subcategories: string[];
  // Allow author to be either an Author object or a string
  author: Author | string;
  createdAt: string;
}

const PostingGridDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const API_URL = `http://localhost:5000/api/postings/${id}`;

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setPost(data);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    fetchPost();
  }, [id, API_URL]);

  if (!post) {
    return <div className="container mx-auto p-5">Loading...</div>;
  }

  // Determine the author name based on the type of the author field
  const authorName = post.author && typeof post.author === "object" ? post.author.username : "Unknown Author";

  return (
    <div className="container mx-auto p-5 w-[960px] ml-[240px] mt-20">
      <Link to="/postgrid" className="text-blue-500 mb-4 inline-block">
        &larr; Back to Posts
      </Link>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {post.image && (
          <img
            src={`http://localhost:5000/${post.image}`}
            alt={post.title}
            className="w-full h-64 object-cover"
          />
        )}
        <div className="p-6">
          <h2 className="text-3xl font-bold mb-4">{post.title}</h2>
          <h4 className="text-md font-semibold mb-2">Author: {authorName}</h4>
          <div
            className="text-gray-700 mb-4"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          <div className="flex flex-wrap gap-2 mb-4">
            {post.subcategories.map((cat, index) => (
              <span
                key={index}
                className="bg-gray-200 text-gray-800 text-sm px-2 py-1 rounded"
              >
                {cat}
              </span>
            ))}
          </div>
          <p className="text-sm text-gray-500">
            Posted on {new Date(post.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PostingGridDetail;
