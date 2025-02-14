
import { useEffect, useState } from "react";
import PostCard, { Post } from "@/components/PostCard";

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

const Index = () => {
  const [visiblePosts, setVisiblePosts] = useState<Post[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-up");
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".post-card").forEach((post) => {
      observer.observe(post);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    setVisiblePosts(posts);
  }, []);

  return (
    <div className="pt-24 pl-72 pr-6 pb-12 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 animate-fade-in">Latest Posts</h1>
      <div className="post-grid">
        {visiblePosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Index;
