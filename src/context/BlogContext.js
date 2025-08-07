import { createContext, useState, useEffect } from 'react';
import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc,
  onSnapshot,
  serverTimestamp
} from "firebase/firestore";
import { db } from "../firebase";

const DEFAULT_BLOGS = [
  {
    id: 'default-1',
    title: 'Welcome to Our Blog Platform',
    content: `Welcome to our amazing blog platform! This is where creativity meets technology. 

Our platform allows you to share your thoughts, ideas, and stories with the world. Whether you're a seasoned writer or just starting your blogging journey, you'll find everything you need here.

Features include:
- Easy-to-use editor
- Search functionality
- User authentication
- Responsive design
- And much more!

Start writing your first blog today and join our growing community of writers and readers.`,
    author: 'bloggier',
    userId: 'bloggier', 
    date: new Date('2024-01-01').toISOString(),
    isDefault: true 
  },
  {
    id: 'default-2',
    title: 'Tips for Great Blog Writing',
    content: `Writing a great blog post is an art that combines creativity with strategy. Here are some essential tips to help you create engaging content:

1. Start with a compelling headline that grabs attention
2. Write an engaging introduction that hooks your readers
3. Use clear, concise language that's easy to understand
4. Break up long text with subheadings and bullet points
5. Include relevant examples and stories
6. End with a strong conclusion or call-to-action

Remember, the best blog posts provide value to your readers. Whether you're educating, entertaining, or inspiring, always keep your audience in mind.

Happy writing!`,
    author: 'bloggier',
    userId: 'bloggier',
    date: new Date('2024-01-02').toISOString(),
    isDefault: true 
  }
];

export const BlogContext = createContext();

export const BlogProvider = ({ children }) => {
  const [userBlogs, setUserBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const blogs = [...DEFAULT_BLOGS, ...userBlogs];

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "blogs"), (snapshot) => {
        const blogsData = snapshot.docs.map(doc => {
            const data = doc.data();
            return {
              id: doc.id,
              ...data,
              date: data.date?.toDate() || new Date() 
            };
          });
      setUserBlogs(blogsData);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const addBlog = async (blogData) => {
    const docRef = await addDoc(collection(db, "blogs"), {
      ...blogData,
      date: serverTimestamp(),
      isDefault: false
    });
    return docRef.id;
  };

  const updateBlog = async (blogId, updatedData) => {
    await updateDoc(doc(db, "blogs", blogId), updatedData);
  };

  const deleteBlog = async (blogId) => {
    await deleteDoc(doc(db, "blogs", blogId));
  };

  const getBlogById = (id) => blogs.find(blog => blog.id === id);

  return (
    <BlogContext.Provider value={{
      blogs,
      addBlog,
      updateBlog,
      deleteBlog,
      getBlogById,
      loading
    }}>
      {children}
    </BlogContext.Provider>
  );
};