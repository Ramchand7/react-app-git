import react, { Component } from "react";
import Man from "./Man";
import Form from "./Form";
import Register from "./Register";
import Greet from "./Greet";
import Container from "./Container";
class Person extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isRegisterd: false,
      name: null,
      email: null,
      password: null,
      showPassword: false,
    };

   
  }
 
  registerHandler = (event) => {
    event.preventDefault();

    // Grabbing form field values from event.target
    const name = event.target.name.value;
    const email = event.target.email.value;
    const password = event.target.password.value;

    console.log(name, email, password); // Check form values

    // After form submission, update the state and set `isRegisterd` to true
    this.setState({
      isRegisterd: true,
      name,
      email,
      password,
    });
  };

  showPasswordHandler = () => {
    alert('sss');
    this.setState({
      showPassword: !this.state.showPassword,
    });
  };
  render() {
   

    return (
      <div>
        {/* {this.state.isRegisterd ? (
          <Greet name={this.state.name} />
        ) : (
          <Register
            submit={this.registerHandler}
              showPasswordHandler={this.showPasswordHandler}
              showPassword={this.state.showPassword}
          />
        )} */}
        <Container></Container>


       
      </div>
    );
  }
}

export default Person;
