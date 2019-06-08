import React from "react";
import "./updateForm.css";
import Footnotes from "../footnotes";
import Image from "../images/images";
import { Link } from "react-router-dom";

const UpdateForm = (props) => {
    const images = props.images.map((image, index) => {
        console.log('image', image);
        return (
            <Image
                key={index}
                id={index}
                image={image}
                imageUpload={props.imageUpload}
            />
        );
    });
    const footnotes = props.footnotes.map((footnote, index) => (
        <Footnotes
            key={index}
            id={index}
            footnote={footnote}
            updateFootnote={props.updateFootnote}
        />
    ));
    return (
        <div id="updateForm">
            <form className="col s12 search" encType="multipart/form-data">
                <div className="row">
                    <div className="input-field col s4">
                        <input id="maker" name="maker" type="text" className="active" value={props.maker || ""} onChange={props.onChange} required />
                        <label className="active" htmlFor="maker">Maker</label>
                    </div>
                    <div className="input-field col s4">
                        <input id="date" name="date" type="text" className="active" value={props.date || ""} onChange={props.onChange} />
                        <label className="active" htmlFor="date">Date</label>
                    </div>
                    <div className="input-field col s4">
                        <select name="type" className="browser-default" value={props.type || ""} onChange={props.onChange}>
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
                        <input id="location" name="location" type="text" className="active" value={props.location || ""} onChange={props.onChange} />
                        <label className="active" htmlFor="location">Location</label>
                    </div>
                    <div className="input-field col s4">
                        <input id="signature" name="signature" type="text" className="active" value={props.signature || ""} onChange={props.onChange} />
                        <label className="active" htmlFor="signature">Signature</label>
                    </div>
                    <div className="input-field col s4">
                        <input id="pitch" name="pitch" type="text" className="active" value={props.pitch || ""} onChange={props.onChange} />
                        <label className="active" htmlFor="pitch">Pitch</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s4">
                        <input id="dimensions" name="dimensions" type="text" className="active" value={props.dimensions || ""} onChange={props.onChange} />
                        <label className="active" htmlFor="dimensions">Dimensions</label>
                    </div>
                    <div className="input-field col s4">
                        <input id="provenance" name="provenance" type="text" className="active" value={props.provenance || ""} onChange={props.onChange} />
                        <label className="active" htmlFor="provenance">Provenance</label>
                    </div>
                    <div className="input-field col s4">
                        <input id="mouthpiece" name="mouthpiece" type="text" className="active" value={props.mouthpiece || ""} onChange={props.onChange} />
                        <label className="active" htmlFor="mouthpiece">Mouthpiece</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12">
                        <textarea id="literature" name="literature" type="text" className="active large-textarea" value={props.literature || ""} onChange={props.onChange} />
                        <label className="active" htmlFor="literature">Literature</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12">
                        <textarea id="remarks" name="remarks" type="text" className="active large-textarea" value={props.remarks || ""} onChange={props.onChange} />
                        <label className="active" htmlFor="remarks">Remarks</label>
                    </div>
                </div>
                <div className="row" id="footnotes">
                    <label className="active" htmlFor="footnotes">Foot Notes</label>
                    {footnotes}
                </div>
                <button type="button" id="newFootnote" onClick={props.newFootnote}>New Footnote</button>
                <div className="row">
                    <label className="active" htmlFor="images">Images</label>
                    {images}
                </div>
                <button type="button" id="newImage" onClick={props.newImage}>New Image</button>
                <div className="row">
                    <button id="createTrombone" type="button" onClick={props.handleSubmit}>{props.button}</button>
                    {props.button === "Update" ? (
                        <button id="delete" type="button" onClick={props.delete}>Delete</button>
                    ) : (null)}
                </div>
            </form>

            <Link to="/admin" className="link" id="backButton">Back</Link>

        </div>
    );
};

export default UpdateForm;