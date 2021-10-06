import React from "react";
import { Link } from "react-router-dom";
import "./trombones.css";

export default function Trombone(props) {
    return (
        <Link className="tromboneLink" to={props.link} >
            <li className="trombone">
                {props.date} {props.maker}
            </li>
        </Link>
    );
}
