import React from "react";
import { Link } from "react-router-dom";
import { Paper, Grid, NativeSelect, TextField, Input, InputLabel, FormControl, Button } from "@material-ui/core";
import AddCircleOutline from "@material-ui/icons/AddCircleOutline";
import "./updateForm.css";
import Footnotes from "./footnotes/footnotes";
import Image from "./images/images";

const UpdateForm = (props) => {
    const images = props.images.map((image, index) => {
        return (
            <Image
                key={index}
                index={index}
                image={image}
                imageUpload={props.imageUpload}
                imageDelete={props.imageDelete}
            />
        );
    });
    const footnotes = props.footnotes.map((footnote, index) => (
        <Footnotes
            key={index}
            index={index}
            footnote={footnote}
            updateFootnote={props.updateFootnote}
        />
    ));
    return (
        <form encType="multipart/form-data">
            <Paper id="updateForm">
                <Grid container spacing={3}>
                    <Grid item xs={4}>
                        <TextField fullWidth id="maker" value={props.maker || ""} onChange={props.onChange} required label="Maker" />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField fullWidth id="date" value={props.date || ""} onChange={props.onChange} label="Date" />
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl fullWidth>
                            <InputLabel htmlFor="typeSelect">Type</InputLabel>
                            <NativeSelect
                                onChange={props.onChange}
                                id="type"
                                value={props.type || ""}
                                input={<Input id="typeSelect" />}
                            >
                                <option value=""></option>
                                <option value="Soprano">Soprano</option>
                                <option value="Alto">Alto</option>
                                <option value="Tenor">Tenor</option>
                                <option value="Bass">Bass</option>
                            </NativeSelect>
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                        <TextField fullWidth id="location" value={props.location || ""} onChange={props.onChange} label="Location" />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField fullWidth id="signature" value={props.signature || ""} onChange={props.onChange} label="Signature" />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField fullWidth id="pitch" value={props.pitch || ""} onChange={props.onChange} label="Pitch" />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField fullWidth id="dimensions" value={props.dimensions || ""} onChange={props.onChange} label="Dimensions" />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField fullWidth id="provenance" value={props.provenance || ""} onChange={props.onChange} label="Provenance" />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField fullWidth id="mouthpiece" value={props.mouthpiece || ""} onChange={props.onChange} label="Mouthpiece" />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField variant="outlined" fullWidth id="literature" multiline rows={3} value={props.literature || ""} onChange={props.onChange} label="Literature" />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField variant="outlined" fullWidth id="remarks" multiline rows={3} value={props.remarks || ""} onChange={props.onChange} label="Remarks" />
                    </Grid>
                    <Grid item xs={12} id="footnotes">
                        <h4>Foot Notes</h4>
                        {footnotes}
                        <Button type="button" variant="outlined" id="newFootnote" onClick={props.newFootnote} disableRipple>
                            <AddCircleOutline />
                            New Footnote
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <h4>Images</h4>
                        {images}
                        <Button variant="outlined" id="newImage" onClick={props.newImage} disableRipple>
                            <AddCircleOutline />
                            New Image
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        {props.button === "Update" && (
                            <Button
                                id="delete"
                                type="button"
                                onClick={props.delete}
                                disableRipple
                            >
                                Delete
                            </Button>
                        )}
                        <Button
                            id="createTrombone"
                            type="button"
                            onClick={props.handleSubmit}
                            disableRipple
                        >
                            {props.button}
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
            <Link to="/admin" className="link" id="backButton">Back</Link>
        </form>
    );
};

export default UpdateForm;