import React, { useState } from "react";
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
import {Link} from "react-router-dom";

const defaultStates = {

  forget: {
    status: null,
    email: null,
  },
};
export function ForgetPassword(props) {
    const [forgetState, setForgetState] = useState(defaultStates.forget);
    const auth = getAuth();
    const forgetPassword = (event) => {
      event.preventDefault();
      if (event.target.email.value == "") {
        setForgetState((prevState) => ({
          ...prevState,
          email: "email is required",
        }));
      } else {
        const email = event.target.email.value;
        
        sendPasswordResetEmail(auth, email)
          .then(() => {
            setForgetState((prevState) => ({
              ...prevState,
              status: "success",
            }));
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
            if (errorCode == "auth/invalid-credential") {
              setForgetState((prevState) => ({
                ...prevState,
                status: "invalid-credential",
              }));
            }
          });
      }
    };
  return (
    <>
      <div className="form-container">
        <div id="login-form">
          <h2>Forget Password</h2>
          <form action="#" onSubmit={ForgetPassword}>
            {forgetState.status != null && (
              <span>{forgetState.status}</span>
            )}
            <div className="input-group">
              <label htmlFor="login-email">Email</label>
              <input
                type="email"
                id="login-email"
                name="email"
                placeholder="Enter your email"
              />
              {forgetState.email != null && (
                <span>{forgetState.email}</span>
              )}
            </div>

            <button type="submit" className="submit-btn">
              Send
            </button>
          </form>

          <div className="toggle-link">
            <p>
              Don't have an account?{" "}
              <Link
                to="/login"
                
                id="go-to-register"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
