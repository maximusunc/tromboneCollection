import React from "react";
import "./searchBar.css";


const SearchBar = (props) => 
    <div id="searchBar">
        <form className="col s12 search">
            <h4 >Search</h4>
                <div className="row">
                <div className="input-field col s3">
                    <input id="maker" name="maker" type="text" className="validate" value={props.maker} onChange={props.makerChange} />
                    <label htmlFor="maker">Maker</label>
                </div>
                <div className="input-field col s3">
                    <input id="date" name="date" type="text" className="validate" value={props.date} onChange={props.dateChange} />
                    <label htmlFor="date">Date</label>
                </div>

                <div className="input-field col s3">
                    <select className="browser-default" name="pitch" onChange={props.pitchChange}>
                        <option value="" defaultValue></option>
                        <option value="A">A</option>
                        <option value="B-flat">B-flat</option>
                        <option value="D">D</option>
                        <option value="E-flat">E-flat</option>
                        <option value="F">F</option>
                        <option value="G">G</option>
                    </select>
                    <label className="active">Pitch</label>
                </div>

                <div className="input-field col s3">
                    <select className="browser-default" name="type" onChange={props.typeChange}>
                        <option value="" defaultValue></option>
                        <option value="Soprano">Soprano</option>
                        <option value="Alto">Alto</option>
                        <option value="Tenor">Tenor</option>
                        <option value="Bass">Bass</option>
                    </select>
                    <label className="active">Type</label>
                </div>
            </div>
        </form>
    </div>;

export default SearchBar;