import React, { useContext, useState, useEffect } from 'react';
import { BlogContext } from '../context/BlogContext';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';

const Edit = () => {
  const { blogs, editBlog } = useContext(BlogContext);
  const { currentUser } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const blog = blogs.find((b) => String(b.id) === String(id));

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (blog) {
      setTitle(blog.title);
      setContent(blog.content);
    }
  }, [blog]);

  useEffect(() => {
    if (blog && currentUser && blog.userId !== currentUser.uid) {
      alert("You don't have permission to edit this blog.");
      navigate('/');
    }
  }, [blog, currentUser, navigate]);

  const validateBlogContent = (title, content) => {
    const errors = [];
    
    if (!title.trim()) errors.push("Title is required");
    if (title.length > 200) errors.push("Title must be under 200 characters");
    if (!content.trim()) errors.push("Content is required");
    if (content.length < 10) errors.push("Content must be at least 10 characters");
    
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Enhanced validation
    const validationErrors = validateBlogContent(title, content);
    if (validationErrors.length > 0) {
      alert(validationErrors.join("\n"));
      return;
    }

    setLoading(true);
    
    try {
      editBlog(id, title.trim(), content.trim());
      navigate(`/blog/${id}`);
    } catch (error) {
      console.error("Error updating blog:", error);
      alert("Failed to update blog. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!blog) {
    return (
      <div className="max-w-2xl mx-auto mt-8 p-4 text-center">
        <p className="text-xl text-gray-600 mb-4">Blog not found.</p>
        <button
          onClick={() => navigate('/')}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-8 p-4">
      <h2 className="text-2xl font-semibold mb-4">Edit Blog</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
          maxLength={200}
          disabled={loading}
        />
        <textarea
          className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
          rows="6"
          required
          minLength={10}
          disabled={loading}
        />
        <div className="flex gap-2">
          <button 
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Blog"}
          </button>
          <button
            type="button"
            onClick={() => navigate(`/blog/${id}`)}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            disabled={loading}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default Edit;