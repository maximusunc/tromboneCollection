import React, { Component } from "react";
import history from "../history";
import API from "../utils/API.js";
import Container from "../components/container";
import UpdateForm from "../components/updateForm";

class Update extends Component {
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
        footnotes: [],
    };

    componentWillMount() {
        var id = window.location.href.split("/")[4];
        this.getTrombone(id);
    };

    getTrombone(id) {
        API.getTrombone(id)
            .then(res => {
                this.setState({
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
                });
            })
            .catch(err => console.log(err));
    }

    handleSubmit = (event) => {
        event.preventDefault();
        // user must input a maker
        const { maker } = this.state;
        if (maker.length < 2) {
            alert("You must at least provide a maker");
        } else {
            this.removeBlankFootnotes(this.state.footnotes);
            this.updateTrombone();
        };
    };

    updateTrombone() {
        var id = window.location.href.split("/")[4];
        // update trombone with entire state
        API.updateTrombone(id, { ...this.state })
            .then(res => {
                alert("Trombone Updated");
                history.push("/admin");
            })
            .catch(err => console.log(err));
    }

    handleDelete = (event) => {
        event.preventDefault();
        var id = window.location.href.split("/")[4];
        // simple confirm before permanently deleting item
        if (window.confirm("Are you sure you want to delete this trombone? This action cannot be undone.")) {
            API.deleteTrombone(id)
                .then(res => {
                    alert("Trombone Permanently Deleted");
                    history.push("/admin");
                })
                .catch(err => console.log(err));
        };
    };

    // handles user input changes
    handleUpdate = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
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

    handleFootnotes = (event) => {
        const { id, value } = event.target;
        let newFootnotes = this.state.footnotes;
        newFootnotes[id] = value;
        this.setState({ footnotes: newFootnotes })
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
                    Update!
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
                    image={this.state.image}
                    onChange={this.handleUpdate}
                    handleSubmit={this.handleSubmit}
                    button="Update"
                    delete={this.handleDelete}
                />

            </Container>
        );
    };
};

export default Update;