import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
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
import { getAuth, onAuthStateChanged } from "firebase/auth";
import cookie from "js-cookie";
import { Posts } from "./webpage/Posts";
import { ToDo } from "./webpage/to-do";
import { store } from "./store";
import { Provider } from "react-redux";
import { toolKitStore } from "./../store/store";
import { AddUser } from "./webpage/addUser";

// Main component that handles authentication state
export function Pages() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    cookie.get("uid") ? true : false
  );

  // Firebase auth state listener for handling user sign-in/sign-out
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // If user is logged in, set the isAuthenticated state to true
        setIsAuthenticated(true);
        // Optionally store user info in cookies or local storage
        cookie.set("uid", user.uid);
      } else {
        // If user is logged out, set isAuthenticated to false
        setIsAuthenticated(false);
        cookie.remove("uid");
      }
    });

    // Clean up the listener on component unmount
    return () => unsubscribe();
  }, []);

  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/:id?"
            element={<ProtectedRoutes isAuthenticated={isAuthenticated} />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/posts/:id?"
            element={
              <>
                <Header title="Post" />
                <Posts />
              </>
            }
          />
          <Route
            path="/todo"
            element={
              <>
                <Header title="To Do" />
                <Provider store={store}>
                  <ToDo />
                </Provider>
              </>
            }
          />
          <Route
            path="/addUser"
            element={
              <>
                <Provider store={toolKitStore}>
                  <Header title="Add Users" />
                  <AddUser />
                </Provider>
              </>
            }
          />

          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="*" element={<Header title="404" />} />
        </Routes>
      </Router>
    </>
  );
}

// Protected routes component that wraps protected pages
function ProtectedRoutes({ isAuthenticated }) {
  const navigate = useNavigate();

  // Redirect to login if not authenticated
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
      </Routes>
      <Footer />
    </>
  );
}
