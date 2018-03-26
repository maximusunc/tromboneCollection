import React from "react";
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const UpdateForm = (props) => 
    <div>
        <TextField
            hintText="Date"
            name="date"
            value={props.date}
            onChange={props.onChange}
        />
        <br />
        <br />
        <SelectField
            floatingLabelText="Type"
            name="type"
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
        <br />
        <br />
        <TextField
            hintText="Maker"
            name="maker"
            value={props.maker || ""}
            onChange={props.onChange}
        />
        <br />
        <br />
        <TextField
            hintText="Location"
            name="location"
            value={props.location || ""}
            onChange={props.onChange}
        />
        <br />
        <br />
        <TextField
            hintText="Signature"
            name="signature"
            value={props.signature || ""}
            onChange={props.onChange}
            fullWidth={true}
        />
        <br />
        <br />
        <TextField
            hintText="Pitch"
            name="pitch"
            value={props.pitch || ""}
            onChange={props.onChange}
            fullWidth={true}
        />
        <br />
        <br />
        <TextField
            hintText="Dimensions"
            name="dimensions"
            value={props.dimensions || ""}
            onChange={props.onChange}
            fullWidth={true}
        />
        <br />
        <br />
        <TextField
            hintText="Found"
            name="found"
            value={props.found || ""}
            onChange={props.onChange}
            fullWidth={true}
        />
        <br />
        <br />
        <TextField
            hintText="Literature"
            name="literature"
            value={props.literature || ""}
            onChange={props.onChange}
            multiLine={true}
            fullWidth={true}
        />
        <br />
        <br />
        <TextField
            hintText="Remarks"
            name="remarks"
            value={props.remarks || ""}
            onChange={props.onChange}
            multiLine={true}
            fullWidth={true}
        />
        <br />
    </div>;

export default UpdateForm;