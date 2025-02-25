import React, { use, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import cookie from "js-cookie";
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
const defaultStates = {
  login: {
    email: null,
    password: null,
    status: null,
  },
};

export function Login(props) {
  const navigate = useNavigate();
  const auth = getAuth();

  const [LoginState, setLoginState] = useState(defaultStates.login);
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();

    try {
      const user_check = auth.currentUser;
      if (user_check) {
        console.log(user_check);
        setLoginState((prevState) => ({
          ...prevState,
          status: "already login",
        }));
        return;
      }

      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log(user);
      setLoginState((prevState) => ({
        ...prevState,
        status: "success",
      }));
      cookie.set("uid", user.uid);
      navigate("/");
    } catch (error) {
      console.error("Error logging in with Google: ", error.message);
    }
  };
  const login = (event) => {
    event.preventDefault();
    if (event.target.email.value == "") {
      setLoginState((prevState) => ({
        ...prevState,
        email: "email field required",
      }));
      return;
    } else if (event.target.password.value == "") {
      setLoginState((prevState) => ({
        ...prevState,
        password: "password field required",
      }));
    } else {
      const email = event.target.email.value;
      const password = event.target.password.value;
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
          setLoginState((prevState) => ({
            ...prevState,
            status: "success",
          }));
          cookie.set("uid", user.uid);

          navigate("/");

          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
          if (errorCode == "auth/invalid-credential") {
            setLoginState((prevState) => ({
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
          <h2>Login</h2>
          <form action="#" onSubmit={login}>
            {LoginState.status != null && <span>{LoginState.status}</span>}
            <div className="input-group">
              <label htmlFor="login-email">Email</label>
              <input
                type="email"
                id="login-email"
                name="email"
                placeholder="Enter your email"
              />
              {LoginState.email != null && <span>{LoginState.email}</span>}
            </div>
            <div className="input-group">
              <label htmlFor="login-password">Password</label>
              <input
                type="password"
                id="login-password"
                name="password"
                placeholder="Enter your password"
              />
              {LoginState.password != null && (
                <span>{LoginState.password}</span>
              )}
            </div>
            <button type="submit" className="submit-btn">
              Login
            </button>
          </form>

          <div className="social-btns">
            <button className="google-btn" onClick={handleGoogleLogin}>
              Login with Google
            </button>
            <button className="facebook-btn">Login with Facebook</button>
          </div>

          <div className="toggle-link">
            <p>
              Don't have an account?{" "}
              <Link to="/register" id="go-to-register">
                Register
              </Link>
              <br />
              <Link to="/forget-password" id="go-to-register">
                Forget Password
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
