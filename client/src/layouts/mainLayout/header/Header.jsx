import React from "react";
import { Link } from "react-router";
import "./header.css";
import Navbar from './navbar/Navbar';

export default function Header() {
  return (
    <header className="topBar">
      <Link to="/" className="topBarName">Historic Trombone Database</Link>
      <Navbar />
    </header>
  );
}
