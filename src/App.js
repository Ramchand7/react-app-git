import "./App.css";
import React, { useState } from "react";
import Container from "./components/Container";
import { Register } from "./components/Register";
import { Login } from "./components/Login";
import { ForgetPassword } from "./components/ForgetPassword";
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
} from "./components/FirebaseComponent";
import { Prev } from "react-bootstrap/esm/PageItem";
const defaultStates = {
  register: {
    email: null,
    password: null,
    userExit: false,
  },
  login: {
    email: null,
    password: null,
    status: null,
  },
  forget: {
    status: null,
    email: null,
  },
};

function App() {
  const [currentForm, setcurrentForm] = useState("login");
  const [registerState, setregisterState] = useState(defaultStates.register);
  const [LoginState, setLoginState] = useState(defaultStates.login);

  const [forgetState, setForgetState] = useState(defaultStates.forget);
  const auth = getAuth();


  const changeForm = (formType) => {
    setregisterState(defaultStates.register);
    setLoginState(defaultStates.login);
    setForgetState(defaultStates.forget);
    setcurrentForm(formType);
  };


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
    } catch (error) {
      console.error("Error logging in with Google: ", error.message);
    }
  };

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
          setcurrentForm("login");

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
    <div className="container">
      {/* <Container></Container> */}
      {currentForm == "register" ? (
        <Register
          changeForm={changeForm}
          submit={register}
          validation={registerState}
        />
      ) : currentForm == "login" ? (
        <Login
          changeForm={changeForm}
          submit={login}
          validation={LoginState}
          handleGoogleLogin={handleGoogleLogin}
        />
      ) : (
        <ForgetPassword
          changeForm={changeForm}
          submit={forgetPassword}
          validation={forgetState}
        />
      )}
    </div>
  );
}

export default App;
