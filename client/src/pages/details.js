import React, {Component} from "react";
import API from "../utils/API.js";
import Container from "../components/container";
import TromboneDetail from "../components/tromboneDetail";
import { Link } from "react-router-dom";

class Details extends Component {
    state = {
        maker: "",
        date: "",
        type: "",
        location: "",
        signature: "",
        pitch: "",
        dimensions: "",
        found: "",
        literature: "",
        remarks: "",
        image:"",
    };

    componentDidMount() {
        API.getTrombone(localStorage.getItem("id"))
            .then(res => this.setState({
                maker: res.data.maker,
                date: res.data.date,
                type: res.data.type,
                location: res.data.location,
                signature: res.data.signature,
                pitch: res.data.pitch,
                dimensions: res.data.dimensions,
                found: res.data.found,
                literature: res.data.literature,
                remarks: res.data.remarks,
                image: res.data.image,
            }))
            .catch(err => console.log(err));
    };


    render() {
        return (
            <Container>
                <TromboneDetail
                    trombone={this.state}
                />
                
                <Link to="/instruments" className="link">Back</Link>
                
            </Container>
        )
    };
};

export default Details;