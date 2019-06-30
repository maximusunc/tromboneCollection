import React from "react";
import Container from "../components/container/container";
import tromboneForm from "../images/historicTromboneForm.pdf";

const Contact = props => 
    <Container>

        <h2>
            Contact Us!
        </h2>
        <p>
            This is the page where you can submit edits or new instruments.
        </p>
        <p>
            Click the following link to download the information form for edits and additions: <a className="contactLink" href={tromboneForm} download="HistoricTromboneForm.pdf">Contact Form</a>
        </p>
        <p>
            Once you've filled the form out, email it <a className="contactLink" href="mailto:&#109;&#107;&#114;&#105;&#115;&#064;&#101;&#109;&#097;&#105;&#108;&#046;&#117;&#110;&#099;&#046;&#101;&#100;&#117;">HERE</a> so we can review it. Thank you!
        </p>
    </Container>;

export default Contact;
