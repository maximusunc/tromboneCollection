import React from "react";
import "./header.css";
import Navbar from './navbar/Navbar';

export default function Header() {
  return (
    <header>
      <h1 id="header">Historic Trombone Collection</h1>
      <Navbar />
    </header>
  );
}
