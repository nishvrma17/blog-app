import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import AuthForm from "../components/AuthForm";

const Signup = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { signup } = useContext(AuthContext);

  const handleSignup = async (email, password) => {
    try {
      setError("");
      setLoading(true);
      await signup(email, password);
      navigate("/");
    } catch (err) {
      let errorMessage = "Signup failed. Please try again.";
      switch (err.code) {
        case "auth/email-already-in-use":
          errorMessage = "Email already in use. Please try logging in instead.";
          break;
        case "auth/invalid-email":
          errorMessage = "Invalid email address.";
          break;
        case "auth/weak-password":
          errorMessage = "Password should be at least 6 characters.";
          break;
        case "auth/operation-not-allowed":
          errorMessage = "Email/password accounts are not enabled.";
          break;
        default:
          errorMessage = err.message || "Signup failed. Please try again.";
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return <AuthForm type="signup" onSubmit={handleSignup} error={error} loading={loading} />;
};

export default Signup;