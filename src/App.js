import { HashRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import Create from "./pages/Create";
import NotFound from "./pages/NotFound";
import { BlogProvider } from "./context/BlogContext";
import { AuthProvider } from "./context/AuthContext";
import Edit from "./pages/Edit";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import MyBlogs from "./pages/MyBlogs";

function App() {
  return (
    <AuthProvider>
      <BlogProvider>
        <Router>
          <div className="font-sans min-h-screen bg-gray-100">
            <Navbar />
            <div className="max-w-4xl mx-auto p-4">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/blog/:id" element={<Blog />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route element={<ProtectedRoute />}>
                  <Route path="/create" element={<Create />} />
                  <Route path="/edit/:id" element={<Edit />} />
                  <Route path="/my-blogs" element={<MyBlogs />} />
                </Route>
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </div>
        </Router>
      </BlogProvider>
    </AuthProvider>
  );
}

export default App;
