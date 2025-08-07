import React, { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BlogContext } from "../context/BlogContext";
import { AuthContext } from "../context/AuthContext";
import { Edit2, Trash2, ArrowLeft, Star } from "lucide-react";

const Blog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getBlogById, deleteBlog } = useContext(BlogContext);
  const { currentUser } = useContext(AuthContext);

  const blog = getBlogById(id);

  if (!blog) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-6 text-center">
        <h2 className="text-xl font-semibold mb-4">Blog not found</h2>
        <button
          onClick={() => navigate("/")}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Back to Home
        </button>
      </div>
    );
  }

  const isOwner = !blog.isDefault && currentUser && (
    (blog.userId && currentUser.uid === blog.userId) ||
    (!blog.userId && blog.author && currentUser.email === blog.author)
  );

  const handleDelete = () => {
    if (blog.isDefault) {
      alert("Featured blogs cannot be deleted.");
      return;
    }
    
    if (window.confirm("Are you sure you want to delete this blog?")) {
      deleteBlog(blog.id);
      navigate("/");
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 mb-6 text-blue-600 hover:text-blue-800"
      >
        <ArrowLeft size={18} />
        Go Back
      </button>

      {blog.isDefault && (
        <div className="flex items-center gap-2 mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <Star className="text-blue-600" size={20} />
          <span className="text-blue-800 font-medium">Featured Blog</span>
        </div>
      )}

      <h1 className="text-3xl font-bold mb-2 text-gray-800">{blog.title}</h1>
      <p className="text-gray-600 mb-4">
        By <span className={blog.isDefault ? 'font-medium text-blue-600' : ''}>{blog.author}</span> • {new Date(blog.date).toLocaleDateString()}
      </p>
      
      <div className="prose max-w-none mb-6">
        <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
          {blog.content}
        </div>
      </div>
      
      {isOwner && (
        <div className="flex gap-4 pt-4 border-t">
          <button
            onClick={() => navigate(`/edit/${blog.id}`)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors duration-200"
          >
            <Edit2 size={16} />
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors duration-200"
          >
            <Trash2 size={16} />
            Delete
          </button>
        </div>
      )}

      {blog.isDefault && (
        <div className="pt-4 border-t">
          <p className="text-sm text-gray-500 italic">
            This is a featured blog and cannot be edited or deleted.
          </p>
        </div>
      )}
    </div>
  );
};

export default Blog;