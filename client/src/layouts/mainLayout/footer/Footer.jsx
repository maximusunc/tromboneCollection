import React from "react";
import "./footer.css";
import logo from "./AMISBanner.jpg";
import mircat from "./mircat.png";

const Footer = () =>
    <footer className="siteFooter">
      <div className="footerLogos">
        <a href="https://mircat.org/" target="_blank" rel="noreferrer noopener">
          <img src={mircat} alt="MIRcat Musical Instrument Research Catalog" height="48" />
        </a>
        <a href="https://www.amis.org/" target="_blank" rel="noreferrer noopener">
          <img src={logo} alt="Supported in part by the American Musical Instrument Society" height="48" />
        </a>
      </div>
      <p className="footerMeta">
        &copy; Trombone Collection 2018–{new Date().getFullYear()}
        {' · '}
        {/* the CMS is a separate page served from client/public/admin */}
        <a href="/admin/">Admin</a>
      </p>
    </footer>;

export default Footer;
