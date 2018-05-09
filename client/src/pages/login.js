import React, {Component} from "react";
import API from "../utils/API.js";
import auth from "../utils/auth.js";

class Login extends Component {
    state = {
        password: ""
    };
  
    login = (event) => {
        event.preventDefault();
        const { history } = this.props;
        if (this.state.password.length > 0) {
            API.login(this.state.password)
            .then(res => {
                auth.authenticate(() => {
                    history.push("/admin");
                });
            })
            .catch(err => console.log("Password incorrect"));
        } else {
            alert("Please enter a password");
        };
    };
  
    handlePassword = (event) => {
      this.setState({password: event.target.value});
    };
  
    render() {
        return (
            <div>
                <h3>
                    Admin Login!
                </h3>
  
                <p>
                    Log in to view admin.
                </p>

                <form className="col s3" >
                    <div className="row">
                        <div className="input-field col s3" id="password">
                            <input 
                                type="password" 
                                name="password" 
                                autoFocus="autoFocus" 
                                value={this.state.password}
                                onChange={this.handlePassword}
                            />
                            <label htmlFor="password">Password</label>
                        </div>
                    </div>
                    <button id="login" onClick={this.login}>Login</button>
                </form>
  
            </div>
        );
    };
};

export default Login;