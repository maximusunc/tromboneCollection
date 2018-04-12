import React, {Component} from "react";
import history from "../history";
import API from "../utils/API.js";
import Container from "../components/container";
// import UpdateForm from "../components/updateForm";

class Update extends Component {
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
    };

    componentDidMount() {
        this.getTrombone();
    };

    getTrombone() {
        API.getTrombone(localStorage.getItem("id"))
        .then(res => {
            this.setState({
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
            });
        })
        .catch(err => console.log(err));
    }

    handleSubmit = (event) => {
        event.preventDefault();
        // handles file upload, appends to formData before sending to back end for multer
        let image = new FormData();
        if (this.file.files[0]) {
            image.append("image", this.file.files[0]);
        }
        if (image.get("image")) {
            // if an image exists, delete it before adding the new one
            if (this.state.image) {
                API.deleteImage(this.state.image)
                .then(res => {
                    console.log("image deleted");
                })
                .catch(err => console.log(err));
            };
            
            // if user chose image file, upload it to filesystem
            API.imageUpload(image)
            .then(res => {
                // setting image in state to filename
                this.setState({"image": res.data}, () => {
                    this.updateTrombone();
                });
            })
            .catch(err => console.log(err));
        } else {
            this.updateTrombone();
        }
    };

    updateTrombone() {
        // update trombone with entire state
        API.updateTrombone(localStorage.getItem("id"), {...this.state})
        .then(res => {
            alert("Trombone Updated");
            history.push("/admin");
        })
        .catch(err => console.log(err));
    }

    handleDelete = (event) => {
        event.preventDefault();
        // simple confirm before permanently deleting item
        if (window.confirm("Are you sure you want to delete this trombone? This action cannot be undone.")) {
            API.deleteTrombone(localStorage.getItem("id"))
                .then(res => {
                    // item is removed from database and then image is removed from filesystem
                    API.deleteImage(this.state.image)
                    .then(res => {
                        alert("Trombone Permanently Deleted");
                        history.push("/admin");
                    })
                    .catch(err => console.log(err));
                })
                .catch(err => console.log(err));
        };
    };

    // handles user input changes
    handleUpdate = (event) => {
        const {name, value} = event.target;
        this.setState({[name]: value});
    };

    render() {
        return (
            <Container>
                <h1>
                    Update!
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
                    onChange={this.handleUpdate}
                    handleSubmit={this.handleSubmit}
                    button="Update"
                    delete={this.handleDelete}
                /> */}


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
                                    <input ref={(ref) => {this.file = ref}} type="file" accept="image/*" />
                                </div>
                                <div className="file-path-wrapper">
                                    <input name="imagePath" className="file-path validate" type="text" />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <button id="createTrombone" type="submit" onClick={this.handleSubmit}>Update</button>
                            <button id="delete" onClick={this.handleDelete}>Delete</button>
                        </div>
                    </form>
                </div>

            </Container>
        );
    };
};

export default Update;