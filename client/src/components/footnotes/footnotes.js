import React from "react";

const Footnotes = (props) =>
    <div>
        <div className="input-field col s12">
            <textarea name="footnote" id={props.id} type="text" className="active" value={props.footnote || ""} onChange={props.updateFootnote} />
        </div>
    </div>;

export default Footnotes;