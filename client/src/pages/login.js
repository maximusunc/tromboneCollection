import React, {Component} from "react";
import fakeAuth from "../utils/auth.js";

class Login extends Component {
    state = {
        password: ""
    };
  
    login = (event) => {
      event.preventDefault();
      const { history } = this.props;
      if (this.state.password === "test") {
        fakeAuth.authenticate(() => {
            history.push("/admin");
        });
      };
    };
  
    handlePassword = (event) => {
      this.setState({password: event.target.value});
    };
  
    render() {
        return (
            <div>
                <h1>
                    Admin Login!
                </h1>
  
                <p>
                    Log in to view admin.
                </p>
                <form>
                    <input 
                        type="password" 
                        name="password" 
                        placeholder="Password"
                        autoFocus="autoFocus" 
                        value={this.state.password} 
                        onChange={this.handlePassword} 
                    />
                  <button id="login" onClick={this.login}>Login</button>
                </form>
  
            </div>
        );
    };
};

export default Login;