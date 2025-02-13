import React, { Component } from "react";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      confirmpassword: "",
      error: {
        name: "",
        email: "",
        password: "",
        confirmpassword: "",
      },
    };
    this.changeHandler = this.changeHandler.bind(this);
  }
  changeHandler = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  submitHandler = (e) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    let error = { ...this.state.error };
    if (e.target.name.value == "") {
      error.name = "Please enter name";
      this.setState({ error });
    }
   else  if (!emailPattern.test(e.target.email.value)) {
      error.email = "Please enter a valid email address.";
      this.setState({ error });
      }
      else if(e.target.password.value.length<6 ){
          error.password = "Password must be greater than 6 characters";
          this.setState({ error });
      }
      else if(e.target.confirmpassword.value !== e.target.password.value){
          error.confirmpassword = "Password doesn't match";
          this.setState({ error });
    } else {
        alert("Form submitted successfully");
        this.setState({
            name: "",
            email: "",
            password: "",
            confirmpassword: "",
            error: {
                name: "",
                email: "",
                password: "",
                confirmpassword: "",
            }
        })
      }
    e.preventDefault();
  };
  render() {
    return (
      <form onSubmit={this.submitHandler}>
        <div>
          <label>Name</label>
          <input
            type="text"
            onChange={this.changeHandler}
            value={this.state.name}
            name="name"
          />
          {this.state.error.name && <span>{this.state.error.name}</span>}
        </div>
        <div>
          <label>email</label>
          <input name="email" type="email" onChange={this.changeHandler} value={this.state.email} />
          {this.state.error.email && <span>{this.state.error.email}</span>}
        </div>
        <div>
          <label>password</label>
          <input name="password" type="password"onChange={this.changeHandler} value={this.state.password} />
          {this.state.error.password && (
            <span>{this.state.error.password}</span>
          )}
        </div>
        <div>
          <label>confirm password</label>
          <input
            name="confirmpassword"
                    type="password"
                    onChange={this.changeHandler}
            value={this.state.confirmpassword}
          />
          {this.state.error.confirmpassword && (
            <span>{this.state.error.confirmpassword}</span>
          )}
        </div>
        <button type="submit">submit</button>
      </form>
    );
  }
}

export default Form;
