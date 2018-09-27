import React, { Component } from "react";
import history from "../history";
import API from "../utils/API.js";
import Container from "../components/container";
import UpdateForm from "../components/updateForm";

class Create extends Component {
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
        image: "",
        footnotes: [""],
    };

    handleSubmit = (event) => {
        event.preventDefault();
        // user must input a maker
        const { maker } = this.state;
        if (maker.length < 2) {
            alert("You must at least provide a maker");
        } else {
            this.removeBlankFootnotes(this.state.footnotes);
            this.addTrombone();
        };
    };

    fileUpload = (event) => {
        var file = event.target.files[0] || undefined;
        var image = "";
        if (file) {
            var reader = new FileReader();
            reader.onloadend = () => {
                image = reader.result;
                this.setState({image: image});
            };
            reader.onerror = function (error) {
                console.log('Error: ', error);
            };
            reader.readAsDataURL(file);
        }
    };

    addTrombone() {
        API.addTrombone({ ...this.state })
            .then(res => {
                alert("Trombone Added!");
                history.push("/admin");
            })
            .catch(err => console.log(err));
    };

    handleUpdate = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    handleFootnotes = (event) => {
        const { id, value } = event.target;
        let newFootnotes = this.state.footnotes;
        newFootnotes[id] = value;
        this.setState({ footnotes : newFootnotes })
    };

    handleNewFootnote = (event) => {
        event.preventDefault();
        let newFootnote = this.state.footnotes;
        newFootnote.push("");
        this.setState({ footnotes: newFootnote });
    };

    removeBlankFootnotes = (footnotes) => {
        for (var i = footnotes.length - 1; i >= 0; i--) {
            if (footnotes[i].length === 0) {
                footnotes.splice(i, 1);
            }
        };
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
                    provenance={this.state.provenance}
                    mouthpiece={this.state.mouthpiece}
                    literature={this.state.literature}
                    remarks={this.state.remarks}
                    footnotes={this.state.footnotes}
                    handleFootnotes={this.handleFootnotes}
                    handleNewFootnote={this.handleNewFootnote}
                    fileUpload={this.fileUpload}
                    onChange={this.handleUpdate}
                    handleSubmit={this.handleSubmit}
                    button="Create"
                />


            </Container>
        );
    };
};

export default Create;