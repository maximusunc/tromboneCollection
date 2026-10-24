import React from "react";
import "./footer.css";
import logo from "./AMISBanner.jpg";
import mircat from "./mircat.png";

const Footer = () =>
    <footer>
      <div style={{ marginTop: 10 }}>
        <a href="https://mircat.org/" target="_blank">
          <img id="MIRcat" src={mircat} alt="MIRcat Musical Instrument Research Catalog" />
        </a>
        <a href="https://www.amis.org/" target="_blank">
          <img id="AMIS" src={logo} alt="American Musical Instrument Society" />
        </a>
      </div>
      <p id="copyright">&copy; Trombone Collection 2018-2023</p>
    </footer>;

export default Footer;