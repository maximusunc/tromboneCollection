import React, {Component} from "react";
import API from "../utils/API.js";

class Login extends Component {
    state = {
        password: "",
        tries: 3
    };
  
    login = (event) => {
        event.preventDefault();
        if (this.state.password.length > 0) {
            API.login(encodeURIComponent(this.state.password))
            .then(res => {
                this.setCookie();
            })
            .catch(err => {
                this.setState({password: "", tries: this.state.tries - 1});
                if (this.state.tries < 1) {
                    document.getElementById("login").setAttribute("disabled", true);
                    document.getElementById("login").style.backgroundColor = "red";
                    alert("Password Incorrect. You have tried too many times.");
                } else {
                    alert("Password Incorrect.");
                }
            });
        } else {
            alert("Please enter a password");
        };
    };

    setCookie = () => {
        const { history } = this.props;
        var date = new Date();
        date.setTime(date.getTime() + (2 * 24 * 60 * 60 * 1000));
        document.cookie = "authorized=authorized; expires=" + date.toGMTString() + "; path=/";
        history.push("/admin");
    };
  
    handlePassword = (event) => {
      this.setState({password: event.target.value});
    };
  
    render() {
        return (
            <div>
                <h4>
                    Admin Login!
                </h4>

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