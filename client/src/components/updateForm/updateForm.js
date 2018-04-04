import React from "react";
import "./updateForm.css";

const UpdateForm = (props) => 
    <div>
        <form className="col s12 search" encType="multipart/form-data" method="POST">
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
                    <input id="found" name="found" type="text" className="active" value={props.found || ""} onChange={props.onChange} />
                    <label className="active" htmlFor="found">Found</label>
                </div>
            </div>
            <div className="row">
                <div className="input-field col s12">
                    <textarea id="literature" name="literature" type="text" className="active" value={props.literature || ""} onChange={props.onChange} />
                    <label className="active" htmlFor="literature">Literature</label>
                </div>
            </div>
            <div className="row">
                <div className="input-field col s12">
                    <textarea id="remarks" name="remarks" type="text" className="active" value={props.remarks || ""} onChange={props.onChange} />
                    <label className="active" htmlFor="remarks">Remarks</label>
                </div>
            </div>
            <div className="row">
                <div className="file-field input-field">
                    <div className="btn">
                        <span>Upload Image</span>
                        <input name="image" type="file" accept="image/*" onChange={props.onChange} />
                    </div>
                    <div className="file-path-wrapper">
                        <input name="imagePath" className="file-path validate" type="text" value={props.imagePath || ""} onChange={props.onChange} />
                    </div>
            </div>
            </div>
        </form>
    </div>;

export default UpdateForm;