import React from "react";
import "./searchArticles.css";
import Container from "../container";

const SearchArticles = props => 
    <Container>
        <div className="articles">
            <a className="article" href={props.url} target="_blank" id={props.id}>{props.title}</a>
            <button className="btn btn-info" id={props.id} onClick={props.onClick}>Save</button>
        </div>
    </Container>;

export default SearchArticles;