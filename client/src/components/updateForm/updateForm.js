import React from "react";
import "./updateForm.css";
import Footnotes from "../footnotes";

const UpdateForm = (props) => {
    const footnotes = props.footnotes.map((footnote, index) => (
        <Footnotes
            key={index}
            id={index}
            footnote={footnote}
            handleUpdate={props.handleFootnotes}
        />
    ));
    return (
        <div>
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
                <button id="newFootnote" onClick={props.handleNewFootnote}>New Footnote</button>
                <div className="row">
                    {props.image && props.image.length > 4 ?
                        <div>
                            <img src={props.image} alt="tromboneImage" />
                            <div className="file-field input-field">
                                <div className="btn">
                                    <span>Change Image</span>
                                    <input id="fileUpload" type="file" accept="image/*" onChange={props.fileUpload} />
                                </div>
                                <div className="file-path-wrapper">
                                    <input name="imagePath" className="file-path validate" type="text" />
                                </div>
                            </div>
                        </div>
                        :
                        <div className="file-field input-field">
                            <div className="btn">
                                <span>Upload Image</span>
                                <input id="fileUpload" type="file" accept="image/*" onChange={props.fileUpload} />
                            </div>
                            <div className="file-path-wrapper">
                                <input name="imagePath" className="file-path validate" type="text" />
                            </div>
                        </div>
                    }
                </div>
                <div className="row">
                    <button id="createTrombone" type="button" onClick={props.handleSubmit}>{props.button}</button>
                    {props.delete ? (
                        <button id="delete" type="button" onClick={props.delete}>Delete</button>
                    ) : (null)}
                </div>
            </form>
        </div>
    );
};

export default UpdateForm;