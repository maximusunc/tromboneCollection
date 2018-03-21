import React, {Component} from "react";
import API from "../utils/API.js";
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

    componentDidMount() {
        API.getTrombone(localStorage.getItem("id"))
            .then(res => this.setState({
                type: res.data.type,
                location: res.data.location,
                signature: res.data.signature,
                pitch: res.data.pitch,
                dimensions: res.data.dimensions,
                found: res.data.found,
                literature: res.data.literature,
                remarks: res.data.remarks
            }))
            .catch(err => console.log(err));
    };


    render() {
        return (
            <Container>
                <p>Type: {this.state.type}</p>
                <p>Location: {this.state.location}</p>
                <p>Signature: {this.state.signature}</p>
                <p>Pitch: {this.state.pitch}</p>
                <p>Dimensions: {this.state.dimensions}</p>
                <p>Found: {this.state.found}</p>
                <p>Literature: {this.state.literature}</p>
                <p>Remarks: {this.state.remarks}</p>
                <Link to="/instruments">Back</Link>
                
            </Container>
        )
    };
};

export default Details;