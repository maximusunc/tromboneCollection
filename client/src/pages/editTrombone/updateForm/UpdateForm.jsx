import React from "react";
import { Link } from "react-router-dom";
import {
    Paper, Grid, NativeSelect, TextField,
    Input, InputLabel, FormControl, Button,
} from "@material-ui/core";
import AddCircleOutline from "@material-ui/icons/AddCircleOutline";
import "./updateForm.css";
import Footnotes from "./footnotes/Footnotes";
import Image from "./images/Images";

export default function UpdateForm({
    trombone,
    updateFootnote, newFootnote,
    imageUpload, imageDelete, newImage,
    updateTextField,
    handleSubmit, handleDelete,
    buttonText,
}) {
    return (
        <form encType="multipart/form-data">
            <Paper id="updateForm">
                <Grid container spacing={3}>
                    <Grid item xs={4}>
                        <TextField
                            fullWidth
                            id="maker"
                            value={trombone.maker || ""}
                            onChange={updateTextField}
                            required
                            label="Maker"
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            fullWidth
                            id="date"
                            value={trombone.date || ""}
                            onChange={updateTextField}
                            label="Date"
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl fullWidth>
                            <InputLabel htmlFor="typeSelect">Type</InputLabel>
                            <NativeSelect
                                onChange={updateTextField}
                                id="type"
                                value={trombone.type || ""}
                                input={<Input id="typeSelect" />}
                            >
                                <option value=""></option>
                                <option value="Soprano">Soprano</option>
                                <option value="Alto">Alto</option>
                                <option value="Tenor">Tenor</option>
                                <option value="Bass">Bass</option>
                                <option value="Contrabass">Contrabass</option>
                            </NativeSelect>
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            fullWidth
                            id="location"
                            value={trombone.location || ""}
                            onChange={updateTextField}
                            label="Location"
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            fullWidth
                            id="signature"
                            value={trombone.signature || ""}
                            onChange={updateTextField}
                            label="Signature"
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            fullWidth
                            id="pitch"
                            value={trombone.pitch || ""}
                            onChange={updateTextField}
                            label="Pitch"
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            fullWidth
                            id="dimensions"
                            value={trombone.dimensions || ""}
                            onChange={updateTextField}
                            label="Dimensions"
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            fullWidth
                            id="provenance"
                            value={trombone.provenance || ""}
                            onChange={updateTextField}
                            label="Provenance"
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            fullWidth
                            id="mouthpiece"
                            value={trombone.mouthpiece || ""}
                            onChange={updateTextField}
                            label="Mouthpiece"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            id="external_link"
                            value={trombone.external_link || ""}
                            onChange={updateTextField}
                            label="External Link"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            id="literature"
                            multiline
                            rows={3}
                            value={trombone.literature || ""}
                            onChange={updateTextField}
                            label="Literature"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            id="remarks"
                            multiline
                            rows={3}
                            value={trombone.remarks || ""}
                            onChange={updateTextField}
                            label="Remarks"
                        />
                    </Grid>
                    <Grid item xs={12} id="footnotes">
                        <h4>Foot Notes</h4>
                        {trombone.footnotes.map((footnote, index) => (
                            <Footnotes
                                key={index}
                                index={index}
                                footnote={footnote}
                                updateFootnote={updateFootnote}
                            />
                        ))}
                        <Button
                            type="button"
                            variant="outlined"
                            id="newFootnote"
                            onClick={newFootnote}
                            disableRipple
                        >
                            <AddCircleOutline />
                            New Footnote
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <h4>Images</h4>
                        {trombone.images.map((image, index) => (
                            <Image
                                key={index}
                                index={index}
                                image={image}
                                imageUpload={imageUpload}
                                imageDelete={imageDelete}
                            />
                        ))}
                        <Button
                            variant="outlined"
                            id="newImage"
                            onClick={newImage}
                            disableRipple
                        >
                            <AddCircleOutline />
                            New Image
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        {buttonText === "Update" && (
                            <Button
                                id="delete"
                                type="button"
                                onClick={handleDelete}
                                disableRipple
                            >
                                Delete
                            </Button>
                        )}
                        <Button
                            id="createTrombone"
                            type="button"
                            onClick={handleSubmit}
                            disableRipple
                        >
                            {buttonText}
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
            <Link to="/admin" className="link" id="backButton">Back</Link>
        </form>
    );
}
