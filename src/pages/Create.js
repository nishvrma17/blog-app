import React, { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BlogContext } from "../context/BlogContext";
import { AuthContext } from "../context/AuthContext";
import { serverTimestamp } from "firebase/firestore";

const Create = () => {
  const { addBlog } = useContext(BlogContext);
  const { currentUser } = useContext(AuthContext);
  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const navigate = useNavigate();
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  const validateBlogContent = (title, content) => {
    const errors = [];
    
    if (!title.trim()) errors.push("Title is required");
    if (title.length > 200) errors.push("Title must be under 200 characters");
    if (!content.trim()) errors.push("Content is required");
    if (content.length < 10) errors.push("Content must be at least 10 characters");
    
    return errors;
  };

  const handlePublish = async (e) => {
    e.preventDefault();
    
    if (!currentUser) {
      setShowLoginPrompt(true);
      return;
    }
  
    const title = titleRef.current?.value || "";
    const content = contentRef.current?.value || "";
  
    const validationErrors = validateBlogContent(title, content);
    if (validationErrors.length > 0) {
      alert(validationErrors.join("\n"));
      return;
    }
  
    try {
        addBlog({
          title: title.trim(),
          content: content.trim(),
          author: currentUser.email,
          userId: currentUser.uid,
          date: serverTimestamp(), 
        });
        navigate("/");
      
    } catch (error) {
      console.error("Error publishing blog:", error);
      alert("Failed to publish blog. Please try again.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 relative">
      <h2 className="text-2xl font-semibold mb-4 text-center">Create New Blog</h2>

      <form onSubmit={handlePublish}>
        <input
          ref={titleRef}
          type="text"
          placeholder="Blog Title"
          className="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
          maxLength={200}
        />
        <textarea
          ref={contentRef}
          placeholder="Write your blog content here..."
          className="w-full p-3 border border-gray-300 rounded h-60 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
          rows="6"
          minLength={10}
        />
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Publish
          </button>
        </div>
      </form>

      {showLoginPrompt && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 overflow-hidden">
            <div className="p-6 text-center">
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Login Required</h3>
              <p className="mb-6 text-gray-600">To publish a blog you need to be logged in.</p>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => setShowLoginPrompt(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={() => navigate("/login")}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition"
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Create;