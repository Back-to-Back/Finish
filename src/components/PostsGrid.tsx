import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Author {
  username: string;
  email: string;
}

interface Post {
  _id: string;
  title: string;
  excerpt: string;
  image?: string;
  categories: string[];
  // Allow author to be either an Author object or a string
  author: Author | string;
  createdAt: string;
}

const PostsGrid = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const API_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${API_URL}/api/posts`);
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="container mx-auto p-5">
      <h2 className="text-3xl font-bold mb-6">Blog Posts</h2>
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => {
          // Determine the author name based on the type of the author field
          const authorName =
            typeof post.author === "object" ? post.author.username : "Unknown Author";

          return (
            <Link key={post._id} to={`/postgrid/${post._id}`}>
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 h-[540px] flex flex-col">
                {post.image && (
                  <img
                    src={`${API_URL}/${post.image}`}
                    alt={post.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                  <p className="text-gray-700 mb-4">{post.excerpt}</p>
                  <h4 className="text-md font-semibold mb-2">Author: {authorName}</h4>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.categories.map((cat, index) => (
                      <span
                        key={index}
                        className="bg-gray-200 text-gray-800 text-sm px-2 py-1 rounded"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                  <p className="text-sm text-gray-500">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default PostsGrid;
