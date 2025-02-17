import React from "react";

import { database, ref, get } from "./FirebaseComponent";
class Questions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount = async () => {
    try {
      const surveyRef = ref(database, "survey");
      const snapshot = await get(surveyRef); // Use async/await here instead of then()

      if (snapshot.exists()) {
        const data = snapshot.val();
          this.setState({ data }, () => console.log(this.state.data)); // Set the fetched data to state
          
      } else {
        console.log("No data available");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  render() {
    return (
      <div>
        <h1>Survey Questions</h1>
        {this.state.data && Object.keys(this.state.data).length > 0 ? (
          <ul>
            {Object.keys(this.state.data).map((key) => (
              <li key={key}>{this.state.data[key].email} - {this.state.data[key].name}</li>
            ))}
          </ul>
        ) : (
          <p>No questions available.</p>
        )}
      </div>
    );
  }
}

export default Questions;
