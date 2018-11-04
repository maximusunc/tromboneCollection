import React from "react";
import Container from "../components/container";
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
            Once you've filled out the form, attach it and email to <a className="contactLink" href="mailto:mkris@email.unc.edu">mkris@email.unc.edu</a> so we can review it. Thank you!
        </p>
    </Container>;

export default Contact;
