import { useParams } from "react-router-dom";
import { Post } from "@/components/PostCard";

const posts: Post[] = [
  {
    id: 1,
    title: "The Future of AI in Web Development",
    excerpt: "Exploring how artificial intelligence is revolutionizing the way we build websites and applications.",
    author: "Alex Chen",
    date: "March 15, 2024",
    category: "Tech",
    imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad0c3"
  },
  {
    id: 2,
    title: "Mindful Living in a Digital Age",
    excerpt: "Tips and strategies for maintaining balance and wellness in our technology-driven world.",
    author: "Sarah Johnson",
    date: "March 14, 2024",
    category: "Lifestyle",
    imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad0c3"
  },
  {
    id: 3,
    title: "Global Economic Trends 2024",
    excerpt: "Analysis of current economic patterns and their impact on international markets.",
    author: "Michael Brown",
    date: "March 13, 2024",
    category: "Politics",
    imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad0c3"
  },
  {
    id: 4,
    title: "Remote Work Success Stories",
    excerpt: "Real-world examples of professionals thriving in remote work environments.",
    author: "Emily White",
    date: "March 12, 2024",
    category: "Career",
    imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad0c3"
  },
  {
    id: 5,
    title: "Must-Read Books of 2024",
    excerpt: "A curated selection of this year's most impactful and engaging books across genres.",
    author: "David Lee",
    date: "March 11, 2024",
    category: "Books",
    imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad0c3"
  }
];

const PostDetail = () => {
  const { id } = useParams();
  const post = posts.find((p) => p.id === Number(id));

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className="pt-24 pl-72 pr-6 pb-12 min-h-screen">
      <article className="max-w-3xl mx-auto glass-effect p-8 rounded-lg animate-fade-in">
        <img
          src={post.imageUrl}
          alt={post.title}
          className="w-full h-64 object-cover rounded-lg mb-6"
        />
        <header className="mb-8">
          <span className="text-primary">{post.category}</span>
          <h1 className="text-4xl font-bold mt-2">{post.title}</h1>
          <div className="flex justify-between items-center mt-4 text-gray-600">
            <span>{post.author}</span>
            <span>{post.date}</span>
          </div>
        </header>
        <div className="prose max-w-none">
          <p className="text-lg leading-relaxed">
            {post.excerpt}
            {/* Add more content here */}
          </p>
        </div>
      </article>
    </div>
  );
};

export default PostDetail;
