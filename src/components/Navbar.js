import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { currentUser, logout } = useAuth();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setShowLogoutConfirm(false);
    navigate("/");
  };

  return (
    <nav className="bg-white shadow p-4">
      <div className="flex justify-between items-center max-w-4xl mx-auto">
        <Link to="/" className="text-xl font-bold text-blue-600">Bloggier</Link>

        <div className="space-x-4">
          <Link to="/" className="text-gray-700 hover:text-blue-600">Home</Link>
          <Link to="/create" className="text-gray-700 hover:text-blue-600">Create</Link>

          {currentUser ? (
            <>
              <Link to="/my-blogs" className="text-gray-700 hover:text-blue-600">My Blogs</Link>
              <button
                onClick={() => setShowLogoutConfirm(true)}
                className="text-blue-600 hover:underline"
              >
                Logout
              </button>

              {showLogoutConfirm && (
                <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
                  <div className="bg-white p-6 rounded-lg shadow-md text-center w-[90%] max-w-sm">
                    <p className="text-lg font-medium mb-4">Are you sure you want to log out?</p>
                    <div className="flex justify-center gap-4">
                      <button
                        onClick={() => setShowLogoutConfirm(false)}
                        className="px-4 py-2 border border-gray-400 rounded hover:bg-gray-100"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleLogout}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                      >
                        Log Out
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            <>
              <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}