import React, { useContext, useState, useMemo } from "react";
import { Link, Navigate } from "react-router-dom";
import { BlogContext } from "../context/BlogContext";
import { AuthContext } from "../context/AuthContext";

const MyBlogs = () => {
  const { blogs } = useContext(BlogContext);
  const { currentUser } = useContext(AuthContext);
  const [sortBy, setSortBy] = useState("newest");

  const myBlogs = useMemo(() => {
    if (!Array.isArray(blogs) || !currentUser?.uid) return [];
    
    const userBlogs = blogs.filter(blog => blog.userId === currentUser.uid);
    
    return userBlogs.sort((a, b) => {
      switch (sortBy) {
        case "oldest":
          return new Date(a.date) - new Date(b.date);
        case "title":
          return a.title.localeCompare(b.title);
        case "newest":
        default:
          return new Date(b.date) - new Date(a.date);
      }
    });
  }, [blogs, currentUser?.uid, sortBy]);

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-2xl font-semibold text-gray-800">My Blogs</h2>
        
        {myBlogs.length > 1 && (
          <div className="flex items-center gap-2">
            <label htmlFor="sort" className="text-sm text-gray-600">
              Sort by:
            </label>
            <select
              id="sort"
              value={sortBy}
              onChange={handleSortChange}
              className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="title">Title A-Z</option>
            </select>
          </div>
        )}
      </div>

      {/* Stats */}
      {myBlogs.length > 0 && (
        <div className="mb-6 p-4 bg-blue-50 rounded-lg">
          <p className="text-blue-800">
            You have published <strong>{myBlogs.length}</strong> blog{myBlogs.length !== 1 ? 's' : ''}
            {myBlogs.length > 0 && (
              <span className="text-sm ml-2">
                • Total words: ~{myBlogs.reduce((acc, blog) => acc + (blog.content?.split(' ').length || 0), 0)}
              </span>
            )}
          </p>
        </div>
      )}
      
      {myBlogs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {myBlogs.map(blog => (
            <div key={blog.id} className="bg-white shadow-md rounded-xl p-4 border hover:shadow-lg transition-shadow duration-200">
              <Link to={`/blog/${blog.id}`}>
                <h3 className="text-lg font-bold text-blue-600 hover:underline mb-2 line-clamp-2">
                  {blog.title}
                </h3>
              </Link>
              <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                {blog.content && blog.content.length > 100 
                  ? blog.content.slice(0, 100) + "..." 
                  : blog.content || "No content"
                }
              </p>
              
              <div className="flex justify-between items-center text-xs text-gray-500 mb-3">
                <span>{new Date(blog.date).toLocaleDateString()}</span>
                <span>~{blog.content?.split(' ').length || 0} words</span>
              </div>
              
              <div className="flex gap-2">
                <Link
                  to={`/edit/${blog.id}`}
                  className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded hover:bg-blue-200 transition-colors duration-200"
                >
                  Edit
                </Link>
                <Link
                  to={`/blog/${blog.id}`}
                  className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded hover:bg-green-200 transition-colors duration-200"
                >
                  View
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="max-w-md mx-auto">
            <div className="mb-4">
              <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No blogs yet</h3>
            <p className="text-gray-500 mb-6">You haven't published any blogs yet. Start sharing your thoughts with the world!</p>
            <Link
              to="/create"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              <svg className="mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Create Your First Blog
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBlogs;