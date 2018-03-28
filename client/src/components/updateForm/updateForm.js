import React from "react";
import "./updateForm.css";

const UpdateForm = (props) => 
    <div>
        <form className="col s12 search">
            <div className="row">
                <div className="input-field col s4">
                    <input id="maker" type="text" className="active" value={props.maker || ""} onChange={props.makerChange} />
                    <label className="active" htmlFor="maker">Maker</label>
                </div>
                <div className="input-field col s4">
                    <input id="date" type="text" className="active" value={props.date || ""} onChange={props.dateChange} />
                    <label className="active" htmlFor="date">Date</label>
                </div>
                <div className="input-field col s4">
                    <select onChange={props.typeChange}>
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
                    <input id="location" type="text" className="active" value={props.location || ""} onChange={props.makerChange} />
                    <label className="active" htmlFor="location">Location</label>
                </div>
                <div className="input-field col s4">
                    <input id="signature" type="text" className="active" value={props.signature || ""} onChange={props.makerChange} />
                    <label className="active" htmlFor="signature">Signature</label>
                </div>
                <div className="input-field col s4">
                    <input id="pitch" type="text" className="active" value={props.pitch || ""} onChange={props.makerChange} />
                    <label className="active" htmlFor="pitch">Pitch</label>
                </div>
            </div>
            <div className="row">
                <div className="input-field col s4">
                    <input id="dimensions" type="text" className="active" value={props.dimensions || ""} onChange={props.makerChange} />
                    <label className="active" htmlFor="dimensions">Dimensions</label>
                </div>
                <div className="input-field col s4">
                    <input id="found" type="text" className="active" value={props.found || ""} onChange={props.makerChange} />
                    <label className="active" htmlFor="found">Found</label>
                </div>
            </div>
            <div className="row">
                <div className="input-field col s12">
                    <textarea id="literature" type="text" className="active" value={props.literature || ""} onChange={props.makerChange} />
                    <label className="active" htmlFor="literature">Literature</label>
                </div>
            </div>
            <div className="row">
                <div className="input-field col s12">
                    <textarea id="remarks" type="text" className="active" value={props.remarks || ""} onChange={props.makerChange} />
                    <label className="active" htmlFor="remarks">Remarks</label>
                </div>
            </div>
        </form>
    </div>;

export default UpdateForm;