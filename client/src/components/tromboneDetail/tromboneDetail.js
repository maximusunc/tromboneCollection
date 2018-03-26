import React from "react";
import "./tromboneDetail.css";

const Details = (props) =>
    <div>
        <a id="pic" href="https://placeholder.com"><img src="http://via.placeholder.com/400x400" alt="placeholder" /></a>
        <ul className="details">
            <li className="detail"><h3>Maker:</h3> {props.trombone.maker}</li>
            <li className="detail"><h3>Date:</h3> {props.trombone.date}</li>
            <li className="detail"><h3>Type:</h3> {props.trombone.type}</li>
            <li className="detail"><h3>Location:</h3> {props.trombone.location}</li>
            <li className="detail"><h3>Signature:</h3> {props.trombone.signature}</li>
            <li className="detail"><h3>Pitch:</h3> {props.trombone.pitch}</li>
            <li className="detail"><h3>Dimensions:</h3> {props.trombone.dimensions}</li>
            <li className="detail"><h3>Found:</h3> {props.trombone.found}</li>
            <li className="detail"><h3>Literature:</h3> {props.trombone.literature}</li>
            <li className="detail"><h3>Remarks:</h3> {props.trombone.remarks}</li>
        </ul>
    </div>;

export default Details;