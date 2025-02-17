import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { Nav } from "./webpage/Nav";
import { Footer } from "./webpage/Footer";
import { Homepage } from "./webpage/Homepage";
import { AboutUs } from "./webpage/AboutUs";
import { Header } from "./webpage/Header";
import { Login } from "./Login";
import { Register } from "./Register";
import { ForgetPassword } from "./ForgetPassword";
import {
  database,
  ref,
  set,
  get,
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from "./FirebaseComponent";

// Separate component for protected routes that uses useNavigate
function ProtectedRoutes({ isAuthenticated }) {
  const navigate = useNavigate();

   
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  return (
    <>
      <Nav authentication={isAuthenticated} />
      <Routes>
        <Route
          path="/about"
          element={
            isAuthenticated ? (
              <>
                <Header title="About" />
                <AboutUs />
              </>
            ) : (
              <Login />
            )
          }
        />
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <>
                <Header title="Welcome" />
                <Homepage />
              </>
            ) : (
              <Login />
            )
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route
          path="*"
          element={
            <>
              <Header title="404" />
            </>
          }
        />
      </Routes>
      <Footer />
    </>
  );
}

// Main component that handles authentication state
export function Pages() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const auth = getAuth();


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });
    return () => unsubscribe();
  }, [auth]);

  return (
    <Router>
      <ProtectedRoutes isAuthenticated={isAuthenticated} />
    </Router>
  );
}
