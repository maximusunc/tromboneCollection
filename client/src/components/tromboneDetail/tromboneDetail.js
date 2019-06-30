import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "./tromboneDetail.css";
import imageUnavailable from "../../images/no_image_available.jpeg";

const Details = (props) => {
    const images = props.trombone.images.length ? props.trombone.images.map((image, i) => (
        <div key={i}>
            <img src={image ? (image) : imageUnavailable} alt={props.trombone.maker} style={{ height: '400px', width: '100%' }} />
        </div>
    )) : <img src={imageUnavailable} alt="Not available" style={{ height: '400px', width: '100%' }} />;
    const settings = {
        dots: true,
    };
    return (
        <div>
            <div id="pics">
                <Slider {...settings}>
                    {images}
                </Slider>
            </div>
            <ul className="details">
                <li className="detail"><b>Maker:</b> {props.trombone.maker}</li>
                {props.trombone.date ? <li className="detail"><b>Date:</b> {props.trombone.date}</li> : ""}
                {props.trombone.type ? <li className="detail"><b>Type:</b> {props.trombone.type}</li> : ""}
                {props.trombone.location ? <li className="detail"><b>Location:</b> {props.trombone.location}</li> : ""}
                {props.trombone.signature ? <li className="detail"><b>Signature:</b> {props.trombone.signature}</li> : ""}
                {props.trombone.pitch ? <li className="detail"><b>Pitch:</b> {props.trombone.pitch}</li> : ""}
                {props.trombone.mouthpiece ? <li className="detail"><b>Mouthpiece:</b> {props.trombone.mouthpiece}</li> : ""}
                {props.trombone.dimensions ? <li className="detail"><b>Dimensions:</b> {props.trombone.dimensions}</li> : ""}
                {props.trombone.provenance ? <li className="detail"><b>Provenance:</b> {props.trombone.provenance}</li> : ""}
                {props.trombone.literature ? <li className="detail"><b>Literature:</b> {props.trombone.literature}</li> : ""}
                {props.trombone.remarks ? <li className="detail"><b>Remarks:</b> {props.trombone.remarks}</li> : ""}
                {props.trombone.footnotes.length ? 
                    <ol className="detail"><b>Foot Notes:</b>
                        {props.trombone.footnotes.map((footnote, index) => 
                            <li className="footnote" key={index}> {footnote} </li>
                        )}
                    </ol>
                : ""}
            </ul>
        </div>
    );
}

export default Details;