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
        images:[""],
        footnotes:[],
    };

    componentDidMount() {
        var id = window.location.href.split("/")[4];
        API.getTrombone(id)
            .then(res => this.setState({ ...res.data }))
            .catch(err => console.log(err));
    };


    render() {
        const ready = !!this.state.maker;
        console.log('state', this.state);
        return (
            <Container>
                {ready &&
                    <div>
                        <TromboneDetail
                            trombone={this.state}
                        />
                        
                        <div id="detailsLinks">
                            <Link to="/instruments" className="link" id="backLink">Back</Link>

                            <Link to={"/api/details/" + window.location.href.split("/")[4]} className="link">Printable Version</Link>
                        </div>
                    </div>
                }
            </Container>
        )
    };
};

export default Details;