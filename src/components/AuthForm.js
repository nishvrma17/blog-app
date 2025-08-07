import React from "react";
import { Link } from "react-router-dom";

const AuthForm = ({ type, onSubmit, error, loading = false }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setPasswordError("");

    if (type === "signup") {
      if (password !== confirmPassword) {
        setPasswordError("Passwords don't match");
        return;
      }
      if (password.length < 6) {
        setPasswordError("Password must be at least 6 characters");
        return;
      }
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setPasswordError("Please enter a valid email address");
      return;
    }

    onSubmit(email, password);
  };

  return (
    <div className="max-w-md mx-auto p-6 mt-10 shadow-lg rounded-lg border bg-white">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          {type === "login" ? "Welcome Back" : "Create Account"}
        </h2>
        <p className="text-gray-600 mt-2">
          {type === "login" 
            ? "Sign in to your account to continue" 
            : "Join our community and start blogging"
          }
        </p>
      </div>

      {(error || passwordError) && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-600 text-sm">{error || passwordError}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            type="email"
            className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
            minLength="6"
            placeholder={type === "signup" ? "At least 6 characters" : "Enter your password"}
          />
        </div>

        {type === "signup" && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              disabled={loading}
              minLength="6"
              placeholder="Confirm your password"
            />
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200"
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {type === "login" ? "Signing In..." : "Creating Account..."}
            </span>
          ) : (
            type === "login" ? "Sign In" : "Create Account"
          )}
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          {type === "login" ? (
            <>
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-600 hover:underline font-medium">
                Sign up here
              </Link>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <Link to="/login" className="text-blue-600 hover:underline font-medium">
                Sign in here
              </Link>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default AuthForm;