import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navigation from "./components/Navigation";
import Sidebar from "./components/Sidebar";
import Index from "./pages/Index";
import PostDetail from "./pages/PostDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import CreatePost from "./components/CreatePost";
import PostGridDetail from "./pages/PostGridDetail";
import PostingGrid from "./components/PostingGrid";
import PostsGrid from "./components/PostsGrid";
import PostingGridDetail from "./pages/PostingGridDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreatePosting from "./components/CreatePosting";
import Payment from "./pages/Payment";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import EditPost from "./pages/EditPost";
import EditPosting from "./pages/EditPosting";

const queryClient = new QueryClient();

const App = () => {

  const isAuthenticated = !!localStorage.getItem('token');
  return (
    <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Navigation />
        <div className="flex flex-col md:flex-row">
          <Sidebar />
          <main className="flex-1 p-4 md:ml-64"></main>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/post/:id" element={<PostDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/postgrid" element={<PostsGrid />} />
            <Route path="/postinggrid" element={<PostingGrid />} />
            <Route path="/postinggrid/:id" element={<PostingGridDetail />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/postgrid/:id" element={<PostGridDetail />} />
            <Route path="/create-post" element={<CreatePost />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/create-posting" element={<CreatePosting />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/subcategory/:name" element={<PostingGrid />} />
            <Route path="/editpost/:id" element={<EditPost />} />
            <Route path="/editposting/:id" element={<EditPosting />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
  );
};

export default App;