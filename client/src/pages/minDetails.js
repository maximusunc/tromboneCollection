import React, {Component} from "react";
import API from "../utils/API.js";
import { Link } from "react-router-dom";

// This page is for printing purposes mainly, minimal css
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
        footnotes:""
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
                footnotes: res.data.footnotes,
            }))
            .catch(err => console.log(err));
    };

    // this takes out the buttons on the bottom and prints out just the information then puts everything back
    printScreen() {
        var printContents = document.getElementById("printContents").innerHTML;
        var wholePage = document.body.innerHTML;
        document.body.innerHTML = printContents;
        window.print();
        document.body.innerHTML = wholePage;
    };


    render() {
        return (
            <div>
                <div id="printContents">
                    <ul className="details">
                        <li className="detail"><h6>Maker:</h6> {this.state.maker}</li>
                        <li className="detail"><h6>Date:</h6> {this.state.date}</li>
                        <li className="detail"><h6>Type:</h6> {this.state.type}</li>
                        <li className="detail"><h6>Location:</h6> {this.state.location}</li>
                        <li className="detail"><h6>Signature:</h6> {this.state.signature}</li>
                        <li className="detail"><h6>Pitch:</h6> {this.state.pitch}</li>
                        <li className="detail"><h6>Dimensions:</h6> {this.state.dimensions}</li>
                        <li className="detail"><h6>Found:</h6> {this.state.found}</li>
                        <li className="detail"><h6>Literature:</h6> {this.state.literature}</li>
                        <li className="detail"><h6>Remarks:</h6> {this.state.remarks}</li>
                        <li className="detail"><h6>Foot Notes:</h6> {this.state.footnotes}</li>
                    </ul>
                </div>

                <div id="minLinks">
                    <Link to="/details" id="backLink" className="link">Back</Link>
                    <button id="printScreen" className="link" type="button" onClick={this.printScreen}>Print Screen</button>
                </div>
                
            </div>
        )
    };
};

export default Details;