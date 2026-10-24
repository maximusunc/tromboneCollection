import React from "react";
import { NavLink } from "react-router";
import "./navbar.css";

export default function Navbar() {
    return (
        <div id="navbar">
            <NavLink to="/home" className="link">Home</NavLink>
            <NavLink to="/instruments" className="link">Instruments</NavLink>
            <NavLink to="/how-to-use" className="link">How To Use</NavLink>
            <NavLink to="/bibliography" className="link">Bibliography</NavLink>
            <NavLink to="/contact" className="link">Contact</NavLink>
            {/* the CMS is a separate page served from client/public/admin */}
            <a href="/admin/" className="link">Admin</a>
        </div>
    );
}
