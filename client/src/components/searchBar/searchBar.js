import React from "react";
import "./searchBar.css";
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {Toolbar, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';


const SearchBar = props => 
    <Toolbar id="nav">
        <ToolbarTitle id="searchTitle" text="Search" />
        <ToolbarSeparator className="separator" />
            <TextField className="search" hintText="Maker" name="maker" onChange={props.makerChange} value={props.maker} />
        <ToolbarSeparator className="separator" />
            <TextField className="search" hintText="Date" name="date" onChange={props.dateChange} value={props.date} />
        <ToolbarSeparator className="separator" />
            <SelectField
                floatingLabelText="Type"
                className="search"
                id="type"
                value={props.type}
                onChange={props.typeChange}
            >
                <MenuItem value="" primaryText="" />
                <MenuItem value="Alto" primaryText="Alto" />
                <MenuItem value="Tenor" primaryText="Tenor" />
                <MenuItem value="Bass" primaryText="Bass" />
                <MenuItem value="Sackbut" primaryText="Sackbut" />
            </SelectField>
        <ToolbarSeparator className="separator" />
            <SelectField
                floatingLabelText="Pitch"
                className="search"
                id="pitch"
                value={props.pitch}
                onChange={props.pitchChange}
            >
                <MenuItem value="" primaryText="" />
                <MenuItem value="B-flat" primaryText="B-flat" />
                <MenuItem value="C" primaryText="C" />
                <MenuItem value="E-flat" primaryText="E-flat" />
                <MenuItem value="F" primaryText="F" />
            </SelectField>
    </Toolbar>;

export default SearchBar;