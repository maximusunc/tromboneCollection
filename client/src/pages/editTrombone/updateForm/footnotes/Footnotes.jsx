import React from "react";
import { TextField } from "@material-ui/core";

const Footnotes = (props) => (
    <div className="footnote">
        <TextField
            variant="outlined"
            fullWidth
            multiline
            rows={2}
            value={props.footnote || ""}
            onChange={(event) => props.updateFootnote(event, props.index)}
        />
    </div>
);

export default Footnotes;