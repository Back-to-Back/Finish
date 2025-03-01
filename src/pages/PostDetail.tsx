import { useParams } from "react-router-dom";
import { Post } from "@/components/PostCard";

const posts: Post[] = [
  {
    id: 1,
    title: "The Future of AI in Web Development",
    excerpt: "Exploring how artificial intelligence is revolutionizing the way we build websites and applications. For starters, Artificial intelligence can not be ignored in the realm of technology. Artificial intelligence has changed the way content and designs are generated. Sites like Wix, Figma, Canvas, and Adobe Express have not been left behind. All of them use AI tools to solicit information from users based on various key factors including preferences. Content is generated based on personalized options. In place of human beings, AI has managed to assist users tirelessly. They can store information necessary to assist visitors. For instance, Chatbots and virtual assistants answer queries based on problems after searching through databases or the internet. With advancements in branding and content generation, AI-powered tools have made it possible to refine and improve images by adding graphics.",
    author: "Alex Chen",
    date: "Feb 15, 2025",
    category: "Tech",
    imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad0c3"
  },
  {
    id: 2,
    title: "Mindful Living in a Digital Age",
    excerpt: "Tips and strategies for maintaining balance and wellness in our technology-driven world. Without reservations, technology is the main driver of the 21st century – therefore saying no to it is inevitable – and we must be able to control its consumption or usage, not the other way around. Taking regular breaks from using modern gadgets is the best way to avoid burnout, and early mental issues such as headaches, eye strain, and mental deterioration. Another common way of choosing our health over devices is setting boundaries. For instance, family members can be warned to avoid usage when dining. Additionally, you are advised to keep away from these devices perhaps one hour before sleep. At different intervals during the day and night, you can put your phone on DND (Do Not Disturb) mode or change variations of brightness and contrast – such as setting 'Dark Mode' or 'Reading Mode'.",
    author: "Sarah Johnson",
    date: "Feb 10, 2025",
    category: "Lifestyle",
    imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad0c3"
  },
  {
    id: 3,
    title: "Global Economic Trends 2025",
    excerpt: "Analysis of current economic patterns and their impact on international markets.",
    author: "Michael Brown",
    date: "Feb 8, 20245",
    category: "Politics",
    imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad0c3"
  },
  {
    id: 4,
    title: "Remote Work Success Stories",
    excerpt: "Real-world examples of professionals thriving in remote work environments.",
    author: "Emily White",
    date: "Feb 3, 2025",
    category: "Career",
    imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad0c3"
  },
  {
    id: 5,
    title: "Must-Read Books of 2025",
    excerpt: "A curated selection of this year's most impactful and engaging books across genres.",
    author: "David Lee",
    date: "Jan 30, 2025",
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
    <div className="pt-10 pb-4 min-h-screen">
      <article className="max-w-3xl mx-auto glass-effect p-8 rounded-lg animate-fade-in">
        <img
          src="/blog.jpg"
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