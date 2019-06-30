import React, {Component} from "react";
import API from "../utils/API.js";
import Container from "../components/container/container";
import { TextField, Button } from "@material-ui/core";

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
                alert("Password Incorrect. You have " + this.state.tries + " tries left.");
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
        const disabled = this.state.tries === 0;
        const color = disabled ? 'secondary' : 'primary';
        return (
            <Container>
                <h3>Admin Login!</h3>

                <form>
                    <TextField 
                        type="password" 
                        name="password" 
                        autoFocus 
                        value={this.state.password}
                        onChange={this.handlePassword}
                        label="Password"
                        disabled={disabled}
                    />
                    <Button
                        id="login"
                        variant="contained"
                        color={color}
                        onClick={this.login}
                        disabled={disabled}
                        type="submit"
                    >
                        Login
                    </Button>
                </form>
  
            </Container>
        );
    };
};

export default Login;