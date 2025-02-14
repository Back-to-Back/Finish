
import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const categories = [
  { id: "tech", label: "Tech", subcategories: ["AI", "Web Development", "Mobile"] },
  { id: "lifestyle", label: "Lifestyle", subcategories: ["Health", "Travel", "Food"] },
  { id: "politics", label: "Politics", subcategories: ["World", "Local", "Economy"] },
  { id: "career", label: "Career", subcategories: ["Job Search", "Skills", "Growth"] },
  { id: "books", label: "Books", subcategories: ["Fiction", "Non-Fiction", "Education"] },
];

const Sidebar = () => {
  return (
    <aside className="glass-effect fixed left-0 top-20 bottom-0 w-64 p-6 overflow-y-auto">
      <div className="space-y-6">
        <div className="space-y-2">
          <Link to="/signup" className="block nav-link">Sign Up</Link>
          <Link to="/membership" className="block nav-link">Membership</Link>
          <Link to="/create-post" className="block nav-link">Create Post</Link>
          <Link to="/trending" className="block nav-link">Trending Posts</Link>
          <Link to="/archives" className="block nav-link">Archives</Link>
        </div>
        
        <div className="pt-4">
          <h3 className="text-lg font-semibold mb-4">Categories</h3>
          <Accordion type="single" collapsible>
            {categories.map((category) => (
              <AccordionItem key={category.id} value={category.id}>
                <AccordionTrigger>{category.label}</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2 pl-4">
                    {category.subcategories.map((sub) => (
                      <Link
                        key={sub}
                        to={`/category/${category.id}/${sub.toLowerCase()}`}
                        className="block nav-link"
                      >
                        {sub}
                      </Link>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
