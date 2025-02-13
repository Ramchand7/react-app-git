import React from "react";
import Details from "./Details";
import Question from "./Questions";
import { v4 as uuid } from "uuid";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCA74jVzji_5c-o9QNpmATvWwp8Kk-eCDM",
  authDomain: "ws-survey-636f2.firebaseapp.com",
  projectId: "ws-survey-636f2",
  storageBucket: "ws-survey-636f2.firebasestorage.app",
  messagingSenderId: "71401516122",
  appId: "1:71401516122:web:61ab3658be6c3a32303c63",
};
const firebaseApp = initializeApp(firebaseConfig);

class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: uuid(),
      name: null,
      email: null,
      isSubmitted: false,
    };
  }
  submitHandler = (e) => {
    e.preventDefault();
    if (e.target.name.value != "" || e.target.email.value != "") {
      this.setState(
        {
          name: e.target.name.value,
          email: e.target.email.value,
          isSubmitted: true,
        },
        () => {
          var database = getDatabase(firebaseApp);
          var reference = ref(database, "survey/" + this.state.id);
          set(reference, {
            name: this.state.name,
            email: this.state.email,
          })
            .then(() => {
              console.log("success", this.state.id);
            })
            .catch((error) => {
              console.log("error", error);
            });
        }
      );
    }
  };
  render() {
    return (
      <>
        <div>
          <div className="row">
            <h1 className=" text-center bg-info text-white p-2">
              Student Survey form
            </h1>
          </div>
          {this.state.isSubmitted ? (
            <Question />
          ) : (
            <Details submit={this.submitHandler} />
          )}
        </div>
      </>
    );
  }
}
export default Container;
