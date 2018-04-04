import React, {Component} from "react";
import history from "../history";
import API from "../utils/API.js";
import Container from "../components/container";
import UpdateForm from "../components/updateForm";
const axios = require("axios");

class Create extends Component {
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
        image: "",
        imagePath: ""
    };

    handleSubmit = () => {
        const { maker } = this.state;
        if (maker.length < 2) {
            alert("You must at least provide a maker");
        } else {
            this.uploadTest();
        };
    };

    addTrombone() {
        API.addTrombone({...this.state})
        .then(res => {
            alert("Trombone Added!");
            history.push("/admin");
        })
        .catch(err => console.log(err));
    };

    uploadTest() {
        console.log(this.state);
        // axios.post("/create", {...this.state});
    };

    handleUpdate = (event) => {
        const state = this.state;

        switch (event.target.name) {
            case "image":
                state.image = event.target.files[0];
                console.log(event.target.files[0]);
                break;
            default:
                state[event.target.name] = event.target.value;
        }

        this.setState(state);
    };

    render() {
        return (
            <Container>
                <h1>
                    Create!
                </h1>

                <UpdateForm 
                    date={this.state.date}
                    maker={this.state.maker}
                    type={this.state.type}
                    location={this.state.location}
                    signature={this.state.signature}
                    pitch={this.state.pitch}
                    dimensions={this.state.dimensions}
                    found={this.state.found}
                    literature={this.state.literature}
                    remarks={this.state.remarks}
                    image={this.state.image}
                    imagePath={this.state.imagePath}
                    onChange={this.handleUpdate}
                />
                
                <button id="createTrombone" onClick={this.handleSubmit}>Create</button>


            </Container>
        );
    };
};

export default Create;