import React from "react";
import { NavLink } from "react-router";
import "./navbar.css";

export default function Navbar() {
    return (
        <nav id="navbar" aria-label="Main">
            {/* "/" and "/home" both show the home page */}
            <NavLink to="/" end className="link">Home</NavLink>
            <NavLink to="/instruments" className="link">Instruments</NavLink>
            <NavLink to="/how-to-use" className="link">How to use</NavLink>
            <NavLink to="/bibliography" className="link">Bibliography</NavLink>
            <NavLink to="/contact" className="link">Contact</NavLink>
        </nav>
    );
}
