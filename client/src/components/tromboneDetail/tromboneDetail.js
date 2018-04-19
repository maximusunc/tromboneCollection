import React from "react";
import "./tromboneDetail.css";

const Details = (props) =>
    <div>
        <img id="pic" src={props.trombone.image ? (window.location.origin + "/images/trombones/" + props.trombone.image) : "https://via.placeholder.com/400x400"} alt="placeholder" />
        <ul className="details">
            <li className="detail"><h6>Maker:</h6> {props.trombone.maker}</li>
            <li className="detail"><h6>Date:</h6> {props.trombone.date}</li>
            <li className="detail"><h6>Type:</h6> {props.trombone.type}</li>
            <li className="detail"><h6>Location:</h6> {props.trombone.location}</li>
            <li className="detail"><h6>Signature:</h6> {props.trombone.signature}</li>
            <li className="detail"><h6>Pitch:</h6> {props.trombone.pitch}</li>
            <li className="detail"><h6>Dimensions:</h6> {props.trombone.dimensions}</li>
            <li className="detail"><h6>Found:</h6> {props.trombone.found}</li>
            <li className="detail"><h6>Literature:</h6> {props.trombone.literature}</li>
            <li className="detail"><h6>Remarks:</h6> {props.trombone.remarks}</li>
        </ul>
    </div>;

export default Details;

// http://via.placeholder.com/400x400