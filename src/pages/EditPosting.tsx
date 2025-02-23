import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill styles

const EditPosting: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [subcategories, setSubCategories] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [seoTitle, setSeoTitle] = useState("");
  const [seoDescription, setSeoDescription] = useState("");
  const [currentImageUrl, setCurrentImageUrl] = useState("");

  const API_URL = import.meta.env.VITE_BACKEND_URL;
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/postings/${id}`);
        const post = response.data;

        setTitle(post.title);
        setContent(post.content);
        setSubCategories(post.subcategories.join(", "));
        setExcerpt(post.excerpt);
        setSeoTitle(post.seoTitle);
        setSeoDescription(post.seoDescription);
        setCurrentImageUrl(post.image ? `${API_URL}/${post.image}` : "");
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    fetchPost();
  }, [id]);

  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const subcategoryArray = subcategories.split(",").map((subcategory) => subcategory.trim());
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("subcategories", subcategoryArray.join(","));
    formData.append("excerpt", excerpt);
    formData.append("seoTitle", seoTitle);
    formData.append("seoDescription", seoDescription);
  
    // Include the current image URL if no new image is uploaded
    if (image) {
      formData.append("image", image);
    } else if (currentImageUrl){
      formData.append("currentImageUrl", currentImageUrl); // Send existing image URL
    }
  
    try {
      await axios.put(`${API_URL}/api/postings/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate("/admin-dashboard");
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  return (
    <div className="w-full ml-[270px] mt-24 max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-6">Edit Post</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Content</label>
          <ReactQuill
            value={content}
            onChange={setContent}
            className="bg-white"
            theme="snow"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Image</label>
          {currentImageUrl && (
            <img
              src={currentImageUrl}
              alt="Current Post"
              className="w-32 h-32 object-cover mb-4"
            />
          )}
          <input
            type="file"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Sub-Categories</label>
          <select
            value={subcategories}
            onChange={(e) => setSubCategories(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          >
            <option value="">Select a sub-category</option>
            <option value="AI">AI</option>
            <option value="mobile">Mobile</option>
            <option value="webdevelopment">Web Development</option>
            <option value="health">Health</option>
            <option value="travel">Travel</option>
            <option value="food">Food</option>
            <option value="world">World</option>
            <option value="local">Local</option>
            <option value="economy">Economy</option>
            <option value="jobsearch">Job Search</option>
            <option value="skills">Skills</option>
            <option value="growth">Growth</option>
            <option value="fiction">Fiction</option>
            <option value="nonfiction">Non-Fiction</option>
            <option value="education">Education</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Excerpt</label>
          <textarea
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            rows={3}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">SEO Title</label>
          <input
            type="text"
            value={seoTitle}
            onChange={(e) => setSeoTitle(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">SEO Description</label>
          <textarea
            value={seoDescription}
            onChange={(e) => setSeoDescription(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            rows={3}
          />
        </div>

        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Update Post
        </button>
      </form>
    </div>
  );
};

export default EditPosting;