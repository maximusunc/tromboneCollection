import React, {Component} from "react";
// import API from "../utils/API.js";
import Container from "../components/container";
import { Link } from "react-router-dom";

class Details extends Component {
    state = {
        type: "",
        location: "",
        signature: "",
        pitch: "",
        dimensions: "",
        found: "",
        literature: "",
        remarks: ""
    };


    render() {
        return (
            <Container>
                <Link to="/instruments">Back</Link>
                
            </Container>
        )
    };
};

export default Details;