import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

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
  author: Author | string;
  createdAt: string;
}

interface Posting {
  _id: string;
  title: string;
  excerpt: string;
  image?: string;
  subcategories: string[];
  author: Author | string;
  createdAt: string;
}

const AdminDashboard: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [postings, setPostings] = useState<Posting[]>([]);

  const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;
  const API_URL = `${API_BASE_URL}/api/posts`;
  const API_URL2 = `${API_BASE_URL}/api/postings`;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(API_URL);
        const response2 = await axios.get(API_URL2);
        setPosts(response.data);
        setPostings(response2.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, []);

  const handleDelete = async (id: string, type: "post" | "posting") => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        const url = `${API_BASE_URL}/api/${type === "post" ? "posts" : "postings"}/${id}`;
        const response = await axios.delete(url);

        if (response.status === 200) {
          if (type === "post") {
            setPosts(posts.filter((post) => post._id !== id));
          } else {
            setPostings(postings.filter((posting) => posting._id !== id));
          }
        } else {
          console.error("Error deleting item: Unexpected response status");
        }
      } catch (error) {
        console.error("Error deleting item:", error);
      }
    }
  };

  return (
    <div className="w-full ml-[270px] mt-24 max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <p>Welcome to your Admin dashboard!</p>
      <Link to="/create-post">
        <button className="mt-4 bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded">
          Create Post According to Categories
        </button>
      </Link>
      <Link to="/create-posting">
        <button className="mt-4 ml-2 bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded">
          Create Post according to Subcategories
        </button>
      </Link>

      {/* Categories-Based-Post Table */}
      <h1 className="text-3xl mt-6 font-bold mb-6">Categories-Based-Post Table</h1>
      <table className="min-w-full mt-6 bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Title</th>
            <th className="py-2 px-4 border-b">Excerpt</th>
            <th className="py-2 px-4 border-b">Categories</th>
            <th className="py-2 px-4 border-b">Author</th>
            <th className="py-2 px-4 border-b">Created At</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => {
            const authorName = typeof post.author === "object" ? post.author.username : "Unknown Author";
            return (
              <tr key={post._id}>
                <td className="py-2 px-4 border-b">{post.title}</td>
                <td className="py-2 px-4 border-b">{post.excerpt}</td>
                <td className="py-2 px-4 border-b">{post.categories.join(", ")}</td>
                <td className="py-2 px-4 border-b">{authorName}</td>
                <td className="py-2 px-4 border-b">{new Date(post.createdAt).toLocaleDateString()}</td>
                <td className="py-2 px-4 border-b">
                  <Link to={`/editpost/${post._id}`} className="text-blue-500 hover:text-blue-700 mr-2">
                    Edit
                  </Link>
                  <button onClick={() => handleDelete(post._id, "post")} className="text-red-500 hover:text-red-700">
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Sub-Categories-Based-Post Table */}
      <h1 className="text-3xl font-bold mb-6">Sub-Categories-Based-Post Table</h1>
      <table className="min-w-full mt-6 bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Title</th>
            <th className="py-2 px-4 border-b">Excerpt</th>
            <th className="py-2 px-4 border-b">Sub-Categories</th>
            <th className="py-2 px-4 border-b">Author</th>
            <th className="py-2 px-4 border-b">Created At</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {postings.map((posting) => {
            const authorName = typeof posting.author === "object" ? posting.author.username : "Unknown Author";
            return (
              <tr key={posting._id}>
                <td className="py-2 px-4 border-b">{posting.title}</td>
                <td className="py-2 px-4 border-b">{posting.excerpt}</td>
                <td className="py-2 px-4 border-b">{posting.subcategories.join(", ")}</td>
                <td className="py-2 px-4 border-b">{authorName}</td>
                <td className="py-2 px-4 border-b">{new Date(posting.createdAt).toLocaleDateString()}</td>
                <td className="py-2 px-4 border-b">
                  <Link to={`/editposting/${posting._id}`} className="text-blue-500 hover:text-blue-700 mr-2">
                    Edit
                  </Link>
                  <button onClick={() => handleDelete(posting._id, "posting")} className="text-red-500 hover:text-red-700">
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
