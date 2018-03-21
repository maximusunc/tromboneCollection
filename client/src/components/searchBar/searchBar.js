import React from "react";
import "./searchBar.css";
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';


const SearchBar = props => 
    <div id="nav">
        <TextField style={{position: "relative", top: 0}} hintText="Maker" name="maker" onChange={props.makerChange} value={props.maker} />
        <SelectField
        floatingLabelText="Type"
        style={{top: 0}}
        value={props.type}
        onChange={props.typeChange}
        >
            <MenuItem value="" primaryText="" />
            <MenuItem value="Alto" primaryText="Alto" />
            <MenuItem value="Tenor" primaryText="Tenor" />
            <MenuItem value="Bass" primaryText="Bass" />
            <MenuItem value="Sackbut" primaryText="Sackbut" />
        </SelectField>
    </div>;

export default SearchBar;