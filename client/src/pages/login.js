import React, { useState } from "react";
import API from "../utils/API.js";
import Container from "../components/container/container";
import { TextField, Button } from "@material-ui/core";

function Login(props) {
    const [password, updatePassword] = useState('');
    const [numTries, updateNumTries] = useState(3);
  
    function login(event) {
        event.preventDefault();
        if (password.length > 0) {
            API.login(encodeURIComponent(password))
            .then(res => {
                setCookie();
            })
            .catch(err => {
                updatePassword('');
                const tries = numTries - 1;
                updateNumTries(tries);
                alert("Password Incorrect. You have " + numTries + " tries left.");
            });
        } else {
            alert("Please enter a password");
        };
    };

    function setCookie() {
        const { history } = props;
        var date = new Date();
        // 2 days
        date.setTime(date.getTime() + (2 * 24 * 60 * 60 * 1000));
        document.cookie = "authorized=ecb0705c8343ba8dca57c2317dc23baae5f0a6fca6ea36b96aa698ed6db8d515; expires=" + date.toGMTString() + "; path=/";
        history.push("/admin");
    };
  
  
    const disabled = numTries === 0;
    const color = disabled ? 'secondary' : 'primary';
    return (
        <Container>
            <h3>Admin Login!</h3>

            <form>
                <TextField 
                    type="password" 
                    name="password" 
                    autoFocus 
                    value={password}
                    onChange={(e) => updatePassword(e.target.value)}
                    label="Password"
                    disabled={disabled}
                />
                <Button
                    id="login"
                    variant="contained"
                    color={color}
                    onClick={login}
                    disabled={disabled}
                    type="submit"
                >
                    Login
                </Button>
            </form>

        </Container>
    );
};

export default Login;