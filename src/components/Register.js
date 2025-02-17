import React, { useState } from "react";
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
} from "./FirebaseComponent";
export function Register(props) {
  const defaultStates = {
    register: {
      email: null,
      password: null,
      userExit: false,
    },
  };
  const navigate = useNavigate(); // useNavigate hook to handle navigation

  const [registerState, setregisterState] = useState(defaultStates.register);
  const auth = getAuth();
  const register = (event) => {
    event.preventDefault();
    if (event.target.email.value == "") {
      setregisterState((prevState) => ({
        ...prevState, // Spread the previous state
        email: "email field required",
      }));
      return;
    } else if (event.target.password.value == "") {
      setregisterState((prevState) => ({
        ...prevState,
        password: "password field required",
      }));
    } else {
      const email = event.target.email.value;
      const password = event.target.password.value;
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          console.log(user);
          navigate("/login");
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);

          if (errorCode == "auth/email-already-in-use") {
            setregisterState((prevState) => ({
              ...prevState,
              userExit: true,
            }));
          } else if (errorCode == "auth/weak-password") {
            setregisterState((prevState) => ({
              ...prevState,
              password: "password is week",
            }));
          }
        });
    }
  };

  return (
    <>
      <div className="form-container" id="register-form">
        <h2>Register</h2>
        {registerState.userExit && <span>User Already Exist</span>}
        <form onSubmit={register}>
          <div className="input-group">
            <label htmlFor="register-email">Email</label>
            <input
              type="email"
              id="register-email"
              name="email"
              placeholder="Enter your email"
              required
            />
            {registerState.email != null && <span>{registerState.email}</span>}
          </div>
          <div className="input-group">
            <label htmlFor="register-password">Password</label>
            <input
              type="password"
              id="register-password"
              name="password"
              placeholder="Create a password"
              required
            />
            {registerState.password != null && (
              <span>{registerState.password}</span>
            )}
          </div>
          <button type="submit" className="submit-btn">
            Register
          </button>
        </form>

        <div className="toggle-link">
          <p>
            Already have an account?{" "}
            <Link to="/login" id="go-to-login">
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
