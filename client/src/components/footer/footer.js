import React from "react";
import "./footer.css";
import logo from "../../images/AMISBanner.jpg";

const Footer = () =>
    <footer>
      <img id="AMIS" src={logo} alt="American Musical Instrument Society" />
      <p id="copyright">&copy; Trombone Collection 2018-2021</p>
    </footer>;

export default Footer;