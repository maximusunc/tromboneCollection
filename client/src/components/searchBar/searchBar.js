import React from "react";
import "./searchBar.css";


const SearchBar = (props) => 
    <div id="searchBar">
        <form className="col s12 search">
            <h4 >Search</h4>
                <div className="row">
                <div className="input-field col s3">
                    <input id="maker" name="maker" type="text" className="validate" value={props.maker} onChange={props.searchChange} />
                    <label htmlFor="maker">Maker</label>
                </div>
                <div className="input-field col s3">
                    <input id="date" name="date" type="text" className="validate" value={props.date} onChange={props.searchChange} />
                    <label htmlFor="date">Date</label>
                </div>

                <div className="input-field col s3">
                    <input id="pitch" name="pitch" type="text" className="validate" value={props.pitch} onChange={props.searchChange} />
                    <label htmlFor="pitch">Pitch</label>
                </div>

                <div className="input-field col s3">
                    <select className="browser-default" name="type" onChange={props.searchChange}>
                        <option value="" defaultValue></option>
                        <option value="Soprano">Soprano</option>
                        <option value="Alto">Alto</option>
                        <option value="Tenor">Tenor</option>
                        <option value="Bass">Bass</option>
                        <option value="Contrabass">Contrabass</option>
                    </select>
                    <label className="active">Type</label>
                </div>
            </div>
        </form>
    </div>;

export default SearchBar;