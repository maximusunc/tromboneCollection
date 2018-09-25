import React, { Component } from "react";
import history from "../history";
import API from "../utils/API.js";
import Container from "../components/container";
import Footnotes from "../components/footnotes";
// import UpdateForm from "../components/updateForm";

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
        fileName: "",
        footnotes: [""],
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const file = this.file.files[0];
        // user must input a maker
        const { maker } = this.state;
        if (maker.length < 2) {
            alert("You must at least provide a maker");
        } else {
            this.removeBlankFootnotes(this.state.footnotes);
            if (file) {
                this.getSignedRequest(file);
            } else {
                this.addTrombone();
            };
        };
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

    getSignedRequest(file) {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', `/sign-s3?file-name=${file.name}&file-type=${file.type}`);
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    const response = JSON.parse(xhr.responseText);
                    this.uploadFile(file, response.signedRequest, response.url);
                }
                else {
                    alert('Could not get signed URL.');
                }
            }
        };
        xhr.send();
    };

    uploadFile(file, signedRequest, url) {
        const xhr = new XMLHttpRequest();
        xhr.open('PUT', signedRequest);
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    this.setState({ "image": url, "fileName": file.name }, () => this.addTrombone());
                }
                else {
                    alert('Could not upload file.');
                }
            }
        };
        xhr.send(file);
    };

    render() {
        const footnotes = this.state.footnotes.map((footnote, index) => (
            <Footnotes
                key={index}
                id={index}
                footnote={footnote}
                handleUpdate={this.handleFootnotes}
            />
        ));
        return (
            <Container>
                <h1>
                    Create!
                </h1>

                {/* <UpdateForm 
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
                    onChange={this.handleUpdate}
                    handleSubmit={this.handleSubmit}
                    button="Create"
                /> */}


                {/* Right now the form is in here to help with direct file uploading */}
                <div>
                    <form className="col s12 search" encType="multipart/form-data">
                        <div className="row">
                            <div className="input-field col s4">
                                <input id="maker" name="maker" type="text" className="active" value={this.state.maker || ""} onChange={this.handleUpdate} required />
                                <label className="active" htmlFor="maker">Maker</label>
                            </div>
                            <div className="input-field col s4">
                                <input id="date" name="date" type="text" className="active" value={this.state.date || ""} onChange={this.handleUpdate} />
                                <label className="active" htmlFor="date">Date</label>
                            </div>
                            <div className="input-field col s4">
                                <select name="type" className="browser-default" value={this.state.type || ""} onChange={this.handleUpdate}>
                                    <option value=""></option>
                                    <option value="Soprano">Soprano</option>
                                    <option value="Alto">Alto</option>
                                    <option value="Tenor">Tenor</option>
                                    <option value="Bass">Bass</option>
                                </select>
                                <label className="active">Type</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s4">
                                <input id="location" name="location" type="text" className="active" value={this.state.location || ""} onChange={this.handleUpdate} />
                                <label className="active" htmlFor="location">Location</label>
                            </div>
                            <div className="input-field col s4">
                                <input id="signature" name="signature" type="text" className="active" value={this.state.signature || ""} onChange={this.handleUpdate} />
                                <label className="active" htmlFor="signature">Signature</label>
                            </div>
                            <div className="input-field col s4">
                                <input id="pitch" name="pitch" type="text" className="active" value={this.state.pitch || ""} onChange={this.handleUpdate} />
                                <label className="active" htmlFor="pitch">Pitch</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s4">
                                <input id="dimensions" name="dimensions" type="text" className="active" value={this.state.dimensions || ""} onChange={this.handleUpdate} />
                                <label className="active" htmlFor="dimensions">Dimensions</label>
                            </div>
                            <div className="input-field col s4">
                                <input id="provenance" name="provenance" type="text" className="active" value={this.state.provenance || ""} onChange={this.handleUpdate} />
                                <label className="active" htmlFor="provenance">Provenance</label>
                            </div>
                            <div className="input-field col s4">
                                <input id="mouthpiece" name="mouthpiece" type="text" className="active" value={this.state.mouthpiece || ""} onChange={this.handleUpdate} />
                                <label className="active" htmlFor="mouthpiece">Mouthpiece</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <textarea id="literature" name="literature" type="text" className="active" value={this.state.literature || ""} onChange={this.handleUpdate} />
                                <label className="active" htmlFor="literature">Literature</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <textarea id="remarks" name="remarks" type="text" className="active" value={this.state.remarks || ""} onChange={this.handleUpdate} />
                                <label className="active" htmlFor="remarks">Remarks</label>
                            </div>
                        </div>
                        <div className="row" id="footnotes">
                            <label className="active" htmlFor="footnotes">Foot Notes</label>
                            {footnotes}
                        </div>
                        <button id="newFootnote" onClick={this.handleNewFootnote}>New Footnote</button>
                        <div className="row">
                            <div className="file-field input-field">
                                <div className="btn">
                                    <span>Upload Image</span>
                                    <input ref={(ref) => { this.file = ref }} type="file" accept="image/*" />
                                </div>
                                <div className="file-path-wrapper">
                                    <input name="imagePath" className="file-path validate" type="text" />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <button id="createTrombone" type="submit" onClick={this.handleSubmit}>Create</button>
                        </div>
                    </form>
                </div>


            </Container>
        );
    };
};

export default Create;