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
        mouthpiece: "",
        dimensions: "",
        provenance: "",
        literature: "",
        remarks: "",
        image:"",
        footnotes:"",
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
                mouthpiece: res.data.mouthpiece,
                dimensions: res.data.dimensions,
                provenance: res.data.provenance,
                literature: res.data.literature,
                remarks: res.data.remarks,
                image: res.data.image,
                footnotes: res.data.footnotes,
            }))
            .catch(err => console.log(err));
    };


    render() {
        return (
            <Container>
                <TromboneDetail
                    trombone={this.state}
                />
                
                <Link to="/instruments" className="link" id="backLink">Back</Link>

                <Link to={"/api/details/" + localStorage.getItem("id")} className="link">Printable Version</Link>
                
            </Container>
        )
    };
};

export default Details;