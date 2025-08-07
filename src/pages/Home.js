import React, { useContext, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { BlogContext } from "../context/BlogContext";

const Home = () => {
  const { blogs } = useContext(BlogContext);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredBlogs = useMemo(() => {
    if (!Array.isArray(blogs)) return [];
    
    return blogs.filter((blog) => {
      if (!blog || typeof blog !== 'object') return false;
      
      const title = blog.title ? String(blog.title).toLowerCase() : "";
      const content = blog.content ? String(blog.content).toLowerCase() : "";
      const author = blog.author ? String(blog.author).toLowerCase() : "";
      const searchText = searchTerm.toLowerCase().trim();
      
      if (!searchText) return true;
      
      return title.includes(searchText) || 
             content.includes(searchText) || 
             author.includes(searchText);
    });
  }, [blogs, searchTerm]);

  const userBlogCount = blogs.filter(blog => !blog.isDefault).length;

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search blog by title, content, or author..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">
          {searchTerm ? `Search Results (${filteredBlogs.length})` : "Recent Blogs"}
        </h2>
        {searchTerm && (
          <button
            onClick={() => setSearchTerm("")}
            className="text-blue-600 hover:text-blue-800 text-sm underline"
          >
            Clear Search
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBlogs.length > 0 ? (
          filteredBlogs.map((blog) => {
            if (!blog || typeof blog !== 'object') return null;
            
            const blogId = blog.id ? String(blog.id) : '';
            const blogTitle = blog.title ? String(blog.title) : 'Untitled Blog';
            const blogContent = blog.content ? String(blog.content) : 'No content available';
            const blogAuthor = blog.author ? String(blog.author) : 'Anonymous';
            const blogDate = blog.date ? new Date(blog.date).toLocaleDateString() : '';
            const isDefault = blog.isDefault || false;

            return (
              <div
                key={blogId}
                className={`bg-white shadow-md rounded-xl p-4 border hover:shadow-lg transition-shadow duration-200 ${
                  isDefault ? 'border-blue-200 bg-blue-50' : ''
                }`}
              >
                {isDefault && (
                  <div className="flex items-center mb-2">
                    <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                      Featured
                    </span>
                  </div>
                )}
                
                <Link to={`/blog/${blogId}`}>
                  <h3 className="text-lg font-bold text-blue-600 hover:underline mb-2 line-clamp-2">
                    {blogTitle}
                  </h3>
                </Link>
                <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                  {blogContent.length > 150
                    ? `${blogContent.substring(0, 150)}...`
                    : blogContent}
                </p>
                <div className="text-xs text-gray-500 flex justify-between items-center">
                  <span className={isDefault ? 'font-medium text-blue-600' : ''}>
                    By {blogAuthor}
                  </span>
                  {blogDate && <span>{blogDate}</span>}
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-full text-center py-10">
            <p className="text-gray-500 text-lg mb-4">
              {searchTerm ? "No blogs found matching your search." : "No blogs available yet."}
            </p>
            {!searchTerm && (
              <Link
                to="/create"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Create First Blog
              </Link>
            )}
          </div>
        )}
      </div>

      {filteredBlogs.length > 0 && (
        <div className="mt-6 text-center text-gray-500 text-sm">
          Showing {filteredBlogs.length} blogs 
          {userBlogCount > 0 && (
            <span> ({userBlogCount} user blogs, {blogs.length - userBlogCount} featured)</span>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;