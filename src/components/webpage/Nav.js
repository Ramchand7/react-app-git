import { Link, useNavigate } from "react-router-dom";

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
} from "./../FirebaseComponent";
export function Nav(Props) {
  const navigate = useNavigate();
             const auth = getAuth();


   const handleLogout = async () => {
     try {
       
       await signOut(auth);
      
       navigate("/login");
     } catch (error) {
       console.error("Logout error:", error);
      
     } 
   };
  console.log('nav');
    return (
      <>
        <header>
          <nav class="navbar navbar-expand-lg navbar-light fixed-top bg-white shadow-sm">
            <div class="container">
              <Link class="navbar-brand" to="/">
                BrandName
              </Link>
              <button
                class="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                  
                 
                  <li class="nav-item">
                    <Link class="nav-link" to="/about">
                      About
                    </Link>
                  </li>
                 
                  {Props.authentication ? (
                    <li class="nav-item">
                      <a class="nav-link" onClick={handleLogout}>
                        Logout
                      </a>
                    </li>
                  ) : (
                    <li class="nav-item">
                      <Link class="nav-link" to="/login">
                        Logout
                      </Link>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </nav>
        </header>
      </>
    );
}