import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router";
import API from "../utils/API.js";

// This page is for printing purposes mainly, minimal css
const footnoteHeader = {
    textAlign: "left",
    paddingLeft: 0,
};
const footnoteStyle = {
    display: "inline",
    paddingLeft: 5,
    paddingRight: 5,
    marginLeft: 10,
    marginRight: 10
};

export default function MinDetails() {
    const { id } = useParams();
    const [trombone, setTrombone] = useState({ footnotes: [] });

    useEffect(() => {
        API.getTrombone(id)
            .then(res => setTrombone(res.data))
            .catch(err => console.log(err));
    }, [id]);

    const footnotes = trombone.footnotes.map((footnote, index) => (
        <li className="footnote" style={footnoteStyle} key={index}>  {index + 1}. {footnote}  </li>
    ));
    return (
        <div>
            <div id="printContents">
                <ul className="details">
                    <li className="detail"><h6>Maker:</h6> {trombone.maker}</li>
                    {trombone.date ? <li className="detail"><h6>Date:</h6> {trombone.date}</li> : ""}
                    {trombone.type ? <li className="detail"><h6>Type:</h6> {trombone.type}</li> : ""}
                    {trombone.location ? <li className="detail"><h6>Location:</h6> {trombone.location}</li> : ""}
                    {trombone.signature ? <li className="detail"><h6>Signature:</h6> {trombone.signature}</li> : ""}
                    {trombone.pitch ? <li className="detail"><h6>Pitch:</h6> {trombone.pitch}</li> : ""}
                    {trombone.mouthpiece ? <li className="detail"><h6>Mouthpiece:</h6> {trombone.mouthpiece}</li> : ""}
                    {trombone.dimensions ? <li className="detail"><h6>Dimensions:</h6> {trombone.dimensions}</li> : ""}
                    {trombone.provenance ? <li className="detail"><h6>Provenance:</h6> {trombone.provenance}</li> : ""}
                    {trombone.external_link ? <li className="detail"><h6>External Link:</h6> {trombone.external_link}</li> : ""}
                    {trombone.literature ? <li className="detail"><h6>Literature:</h6> {trombone.literature}</li> : ""}
                    {trombone.remarks ? <li className="detail"><h6>Remarks:</h6> {trombone.remarks}</li> : ""}
                    {footnotes.length ? <ol className="detail" style={footnoteHeader}><h6>Foot Notes:</h6> {footnotes}</ol> : ""}
                </ul>
            </div>

            {/* hidden when printing, see pages.css */}
            <div id="minLinks">
                <Link to={"/details/" + id} id="backLink" className="link">Back</Link>
                <button id="printScreen" className="link" type="button" onClick={() => window.print()}>Print or Save</button>
            </div>
        </div>
    );
};
