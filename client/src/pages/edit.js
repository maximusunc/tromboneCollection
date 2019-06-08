import React, { Component } from "react";
import history from "../history";
import API from "../utils/API.js";
import Container from "../components/container";
import UpdateForm from "../components/updateForm";

class EditTrombone extends Component {
    state = {
        id: "",
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
        images: [""],
        footnotes: [""],
    };

    componentDidMount() {
        const id = window.location.href.split("/")[4];
        if (id) {
            this.getTrombone(id);
        }
    };

    getTrombone(id) {
        API.getTrombone(id)
            .then(res => {
                this.setState({ ...res.data, id: id });
            })
            .catch(err => console.log(err));
    };

    handleSubmit = (event) => {
        event.preventDefault();
        // user must input a maker
        const { maker } = this.state;
        if (maker.length < 4) {
            alert("The trombone must have a valid maker.");
        } else {
            this.removeBlankFootnotes();
            if (this.state.id) {
                this.updateTrombone();
            } else {
                this.addTrombone();
            }
        };
    };

    addTrombone() {
        console.log('state before add', this.state);
        API.addTrombone({ ...this.state })
            .then(res => {
                alert("Trombone Added!");
                history.push("/admin");
            })
            .catch(err => console.log(err));
    };

    updateTrombone() {
        const { id } = this.state;
        console.log('state', this.state);
        // update trombone with entire state
        API.updateTrombone(id, { ...this.state })
            .then(res => {
                alert("Trombone Updated");
                history.push("/admin");
            })
            .catch(err => console.log(err));
    };

    handleDelete = (event) => {
        event.preventDefault();
        const { id } = this.state;
        // simple confirm before permanently deleting item
        if (id && window.confirm("Are you sure you want to delete this trombone? This action cannot be undone.")) {
            API.deleteTrombone(id)
                .then(res => {
                    alert("Trombone Permanently Deleted");
                    history.push("/admin");
                })
                .catch(err => console.log(err));
        };
    };

    imageUpload = (event) => {
        const { id } = event.target;
        const file = event.target.files[0] || undefined;
        const { images } = this.state;
        if (file) {
            var reader = new FileReader();
            reader.onloadend = () => {
                const image = reader.result;
                images[id] = image;
                this.setState({ images });
            };
            reader.onerror = function (error) {
                console.log('Error: ', error);
            };
            reader.readAsDataURL(file);
        }
    };

    newImage = (event) => {
        event.preventDefault();
        const { images } = this.state;
        images.push("");
        this.setState({ images });
    };

    updateTextField = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    updateFootnote = (event) => {
        const { id, value } = event.target;
        const { footnotes } = this.state;
        footnotes[id] = value;
        this.setState({ footnotes })
    };

    newFootnote = (event) => {
        event.preventDefault();
        const { footnotes } = this.state;
        footnotes.push("");
        this.setState({ footnotes });
    };

    removeBlankFootnotes = () => {
        const { footnotes } = this.state;
        footnotes.filter((footnote) => footnote);
        this.setState({ footnotes });
    };

    render() {
        const { id } = this.state;
        const title = id ? "Update" : "Create";
        return (
            <Container>
                <h1>{title}!</h1>

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
                    updateFootnote={this.updateFootnote}
                    newFootnote={this.newFootnote}
                    images={this.state.images}
                    imageUpload={this.imageUpload}
                    newImage={this.newImage}
                    onChange={this.updateTextField}
                    handleSubmit={this.handleSubmit}
                    button={title}
                    delete={this.handleDelete}
                />

            </Container>
        );
    };
};

export default EditTrombone;
