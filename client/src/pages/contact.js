import React from "react";
import Container from "../components/container";

const Contact = props => 
    <Container>
        <p>
            This is the page where you can submit edits or new instruments.
        </p>
        <p>
            Click the following link to download our contact form with all the information on the new instrument or edit: <a href="./images/trombones/trombone.jpeg" download="instrument_form">Form</a>
        </p>
        <p>
            Once you've filled out the form, attach it and email to <a href="mailto:mkris@email.unc.edu">mkris@email.unc.edu</a> so we can review it. Thank you!
        </p>
    </Container>;

export default Contact;
