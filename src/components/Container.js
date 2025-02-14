import React from "react";
import Details from "./Details";
import Question from "./Questions";
import { v4 as uuid } from "uuid";
import databse from "./FirebaseComponent";
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
