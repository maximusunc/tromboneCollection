import React from "react";
import "./footer.css";
import logo from "../../images/AMISBanner.jpg";

const Footer = () =>
    <footer>
      <img id="AMIS" src={logo} alt="American Musical Instrument Society" />
      <h5>&copy; Trombone Collection 2018</h5>
    </footer>;

export default Footer;