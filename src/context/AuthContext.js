import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "firebase/auth";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cachedUser = localStorage.getItem('currentUser');
    if (cachedUser) {
      try {
        const user = JSON.parse(cachedUser);
        setCurrentUser(user);
      } catch (e) {
        localStorage.removeItem('currentUser');
      }
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userData = {
          email: user.email,
          uid: user.uid
        };
        setCurrentUser(userData);
        localStorage.setItem('currentUser', JSON.stringify(userData));
      } else {
        setCurrentUser(null);
        localStorage.removeItem('currentUser');
      }
      setLoading(false);
    });
    
    return unsubscribe;
  }, 
  []); 
  const login = async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const userData = {
      email: userCredential.user.email,
      uid: userCredential.user.uid
    };
    setCurrentUser(userData);
    localStorage.setItem('currentUser', JSON.stringify(userData));
  };
  
  const signup = async (email, password) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const userData = {
      email: userCredential.user.email,
      uid: userCredential.user.uid
    };
    setCurrentUser(userData);
    localStorage.setItem('currentUser', JSON.stringify(userData));
  };

  const logout = async () => {
    await signOut(auth);
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };

  const value = {
    currentUser,
    login,
    signup,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}