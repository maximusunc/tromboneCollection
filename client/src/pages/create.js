import React, {Component} from "react";
import history from "../history";
import API from "../utils/API.js";
import Container from "../components/container";
// import UpdateForm from "../components/updateForm";
// const axios = require("axios");

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
        image: ""
    };

    handleSubmit = (event) => {
        event.preventDefault();
        // if user uploads an image, puts it in formData for back end multer
        // let image = new FormData();
        // if (this.file.files[0]) {
        //     image.append("image", this.file.files[0]);
        // }
        // user must input a maker
        const { maker } = this.state;
        if (maker.length < 2) {
            alert("You must at least provide a maker");
        } else {
            // if user uploads an image, store it in filesystem, otherwise create item
            // if (image.get("image")) {
            //     API.imageUpload(image)
            //     .then(res => {
            //         // setting state of image to filename
            //         this.setState({"image": res.data}, () => {
            //             this.addTrombone();
            //         });
            //     })
            //     .catch(err => console.log(err));
            // } else {
                this.addTrombone();
            // }
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

    handleUpdate = (event) => {
        const {name, value} = event.target;
        this.setState({[name]: value});
    };

    handleFileChange = () => {
        const file = this.file.files[0];
        this.getSignedRequest(file);
    };

    getSignedRequest(file) {
        API.getSignedRequest(file)
        .then(res => {
            this.setState({"image": res.url});
            console.log(res);
        })
        .catch(err => console.log(err));
    };

    render() {
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
                                    <option value="Alto">Alto</option>
                                    <option value="Tenor">Tenor</option>
                                    <option value="Bass">Bass</option>
                                    <option value="Sackbut">Sackbut</option>
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
                                <input id="found" name="found" type="text" className="active" value={this.state.found || ""} onChange={this.handleUpdate} />
                                <label className="active" htmlFor="found">Found</label>
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
                        <div className="row">
                            <div className="file-field input-field">
                                <div className="btn">
                                    <span>Upload Image</span>
                                    <input ref={(ref) => {this.file = ref}} type="file" accept="image/*" onChange={this.handleFileChange} />
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