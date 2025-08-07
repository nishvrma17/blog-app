import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import AuthForm from "../components/AuthForm";

const Login = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleLogin = async (email, password) => {
    try {
      setError("");
      setLoading(true);
      await login(email, password);
      navigate("/");
    } catch (err) {
      let errorMessage = "Login failed. Please try again.";
      switch (err.code) {
        case "auth/user-not-found":
          errorMessage = "No account found with this email.";
          break;
        case "auth/wrong-password":
          errorMessage = "Incorrect password.";
          break;
        case "auth/invalid-email":
          errorMessage = "Invalid email address.";
          break;
        case "auth/too-many-requests":
          errorMessage = "Too many failed attempts. Please try again later.";
          break;
        case "auth/user-disabled":
          errorMessage = "This account has been disabled.";
          break;
        case "auth/invalid-credential":
          errorMessage = "Invalid email or password.";
          break;
        default:
          errorMessage = err.message || "Login failed. Please try again.";
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return <AuthForm type="login" onSubmit={handleLogin} error={error} loading={loading} />;
};

export default Login;