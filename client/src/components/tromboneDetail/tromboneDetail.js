import React from "react";
import { Carousel } from "react-responsive-carousel";
import "./tromboneDetail.css";
import imageUnavailable from "../../images/no_image_available.jpeg";

const Details = (props) =>
    <div>
        <Carousel>
            <img id="pic" src={props.trombone.image ? (props.trombone.image) : imageUnavailable} alt={props.trombone.maker} />
        </Carousel>
        <ul className="details">
            <li className="detail"><h6>Maker:</h6> {props.trombone.maker}</li>
            {props.trombone.date ? <li className="detail"><h6>Date:</h6> {props.trombone.date}</li> : ""}
            {props.trombone.type ? <li className="detail"><h6>Type:</h6> {props.trombone.type}</li> : ""}
            {props.trombone.location ? <li className="detail"><h6>Location:</h6> {props.trombone.location}</li> : ""}
            {props.trombone.signature ? <li className="detail"><h6>Signature:</h6> {props.trombone.signature}</li> : ""}
            {props.trombone.pitch ? <li className="detail"><h6>Pitch:</h6> {props.trombone.pitch}</li> : ""}
            {props.trombone.mouthpiece ? <li className="detail"><h6>Mouthpiece:</h6> {props.trombone.mouthpiece}</li> : ""}
            {props.trombone.dimensions ? <li className="detail"><h6>Dimensions:</h6> {props.trombone.dimensions}</li> : ""}
            {props.trombone.provenance ? <li className="detail"><h6>Provenance:</h6> {props.trombone.provenance}</li> : ""}
            {props.trombone.literature ? <li className="detail"><h6>Literature:</h6> {props.trombone.literature}</li> : ""}
            {props.trombone.remarks ? <li className="detail"><h6>Remarks:</h6> {props.trombone.remarks}</li> : ""}
            {props.trombone.footnotes.length ? 
                <ol className="detail"><h6>Foot Notes:</h6>
                    {props.trombone.footnotes.map((footnote, index) => 
                        <li className="footnote" key={index}> {footnote} </li>
                    )}
                </ol>
            : ""}
        </ul>
    </div>;

export default Details;