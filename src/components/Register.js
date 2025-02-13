/* The Register class in JavaScript is a React component that renders a registration form with input
fields for name, email, and password, along with a button to submit the form. */
import React, { components } from "react";
import "./../App.css";
import styled from "styled-components";
let StyledDiv = styled.div`
  background-color: #000;
  height: 200px;
  width: 100px;
  color:#fff;
`;

class Register extends React.Component {

    constructor(props) {
      super(props);
       

  }
  
 
    render() {
   
        return (
          <div className="container card p-3 mt-2 w-25 mx-auto">
            <StyledDiv>www</StyledDiv>
            <h1>Register Form</h1>
            <form onSubmit={this.props.submit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" name="name" className="form-control" />
              </div>
              <div>
                <label htmlFor="email">email</label>
                <input type="email" name="email" className="form-control" />
              </div>
              <div className="form-group">
                <label htmlFor="password">password</label>

                <input
                  type={this.props.showPassword ? "text" : "password"}
                  name="password"
                  className="form-control"
                />
              </div>
              <span className="btn btn-danger1  mx-2" onClick={this.props.showPasswordHandler}>
                {this.props.showPassword ? "hide password" : "show password"}
              </span>
              <button type="submit" className="btn btn-primary">
                Register
              </button>
            </form>
          </div>
        );
    }
}

export default Register;