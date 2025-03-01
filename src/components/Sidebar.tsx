import { Link } from "react-router-dom";
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="fixed top-5 left-5 z-50 p-2 text-white bg-indigo-600 rounded-md md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        ☰
      </button>

      {/* Overlay when sidebar is open on mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Sidebar Component */}
      <aside
        className={`fixed left-0 top-16 bottom-0 w-64 p-6 overflow-y-auto bg-white shadow-md transition-transform duration-300 z-40
          ${isOpen ? "translate-x-0" : "-translate-x-64"} md:translate-x-0 md:relative md:block`}
      >
        {/* Close Button for Mobile */}
        <button
          className="absolute top-4 right-4 md:hidden text-gray-700"
          onClick={() => setIsOpen(false)}
        >
          ✖
        </button>

        {/* Sidebar Content */}
        <div className="space-y-6">
          {/* Navigation Links */}
          <div className="space-y-2">
            <Link to="/register" className="block nav-link">
              Sign Up
            </Link>
            <Link to="/membership" className="block nav-link">
              Membership
            </Link>
            <Link to="/notifications" className="block nav-link">
              Notifications
            </Link>
            <Link to="/postgrid" className="block nav-link">
              Trending Posts
            </Link>
            <Link to="/archives" className="block nav-link">
              Archives
            </Link>
            <Link to="/postinggrid" className="block nav-link">
              Browse All (Sub-Categories)
            </Link>
            <Link to="/login" className="block nav-link">
              Login
            </Link>
          </div>

          {/* Categories Section */}
          <div className="pt-4">
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <Accordion type="single" collapsible>
              {/* Tech Category */}
              <AccordionItem value="tech">
                <AccordionTrigger>Tech</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2 pl-4">
                    <Link to="/category/tech/ai" className="block nav-link">
                      AI
                    </Link>
                    <Link to="/subcategory/webdevelopment" className="block nav-link">
                      Web Development
                    </Link>
                    <Link to="/category/tech/mobile" className="block nav-link">
                      Mobile
                    </Link>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Lifestyle Category */}
              <AccordionItem value="lifestyle">
                <AccordionTrigger>Lifestyle</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2 pl-4">
                    <Link to="/category/lifestyle/health" className="block nav-link">
                      Health
                    </Link>
                    <Link to="/category/lifestyle/travel" className="block nav-link">
                      Travel
                    </Link>
                    <Link to="/category/lifestyle/food" className="block nav-link">
                      Food
                    </Link>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Politics Category */}
              <AccordionItem value="politics">
                <AccordionTrigger>Politics</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2 pl-4">
                    <Link to="/category/politics/world" className="block nav-link">
                      World
                    </Link>
                    <Link to="/category/politics/local" className="block nav-link">
                      Local
                    </Link>
                    <Link to="/subcategory/economy" className="block nav-link">
                      Economy
                    </Link>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Career Category */}
              <AccordionItem value="career">
                <AccordionTrigger>Career</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2 pl-4">
                    <Link to="/category/career/job-search" className="block nav-link">
                      Job Search
                    </Link>
                    <Link to="/category/career/skills" className="block nav-link">
                      Skills
                    </Link>
                    <Link to="/category/career/growth" className="block nav-link">
                      Growth
                    </Link>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Books Category */}
              <AccordionItem value="books">
                <AccordionTrigger>Books</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2 pl-4">
                    <Link to="/category/books/fiction" className="block nav-link">
                      Fiction
                    </Link>
                    <Link to="/category/books/non-fiction" className="block nav-link">
                      Non-Fiction
                    </Link>
                    <Link to="/category/books/education" className="block nav-link">
                      Education
                    </Link>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
