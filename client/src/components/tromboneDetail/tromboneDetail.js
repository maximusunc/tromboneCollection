import React from "react";
import "./tromboneDetail.css";
import imageUnavailable from "../../images/no_image_available.jpeg";

const Details = (props) =>
    <div>
        <img id="pic" src={props.trombone.image ? (props.trombone.image) : imageUnavailable} alt={props.trombone.maker} />
        <ul className="details">
            <li className="detail"><h6>Maker:</h6> {props.trombone.maker}</li>
            <li className="detail"><h6>Date:</h6> {props.trombone.date}</li>
            <li className="detail"><h6>Type:</h6> {props.trombone.type}</li>
            <li className="detail"><h6>Location:</h6> {props.trombone.location}</li>
            <li className="detail"><h6>Signature:</h6> {props.trombone.signature}</li>
            <li className="detail"><h6>Pitch:</h6> {props.trombone.pitch}</li>
            <li className="detail"><h6>Mouthpiece:</h6> {props.trombone.mouthpiece}</li>
            <li className="detail"><h6>Dimensions:</h6> {props.trombone.dimensions}</li>
            <li className="detail"><h6>Provenance:</h6> {props.trombone.provenance}</li>
            <li className="detail"><h6>Literature:</h6> {props.trombone.literature}</li>
            <li className="detail"><h6>Remarks:</h6> {props.trombone.remarks}</li>
            <ol className="detail"><h6>Foot Notes:</h6> {props.trombone.footnotes.map((footnote, index) => 
                <li className="footnote" key={index}> {footnote} </li>
            )}</ol>
        </ul>
    </div>;

export default Details;

// http://via.placeholder.com/400x400