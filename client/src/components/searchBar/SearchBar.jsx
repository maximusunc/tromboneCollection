import React, { useContext } from "react";
import { Paper, NativeSelect, InputLabel, Input, FormControl, TextField } from "@mui/material";
import "./searchBar.css";

import TromboneContext from '../../context/trombones';

export default function SearchBar() {
    const { searchBar } = useContext(TromboneContext);

    return ( 
        <Paper id="searchBar">
            <h2>Search</h2>
            <form className="search">
                <FormControl className="input-field">
                    <TextField
                        id="maker"
                        name="maker"
                        label="Maker"
                        type="text"
                        variant="standard"
                        className="validate"
                        value={searchBar.maker}
                        onChange={(e) => searchBar.setMaker(e.target.value)}
                    />
                </FormControl>
                <FormControl className="input-field">
                    <TextField
                        id="date"
                        name="date"
                        label="Date"
                        type="text"
                        variant="standard"
                        className="validate"
                        value={searchBar.date}
                        onChange={(e) => searchBar.setDate(e.target.value)}
                    />
                </FormControl>

                <FormControl className="input-field">
                    <TextField
                        id="pitch"
                        name="pitch"
                        label="Pitch"
                        type="text"
                        variant="standard"
                        className="validate"
                        value={searchBar.pitch}
                        onChange={(e) => searchBar.setPitch(e.target.value)}
                    />
                </FormControl>

                <FormControl className="input-field" variant="standard">
                    <InputLabel htmlFor="typeSelect" style={{ padding: '10px' }}>Type</InputLabel>
                    <NativeSelect
                        className="browser-default"
                        name="type"
                        value={searchBar.type}
                        onChange={(e) => searchBar.setType(e.target.value)}
                        input={<Input id="typeSelect" name="type" />}
                    >
                        <option value=""></option>
                        <option value="Soprano">Soprano</option>
                        <option value="Alto">Alto</option>
                        <option value="Tenor">Tenor</option>
                        <option value="Bass">Bass</option>
                        <option value="Contrabass">Contrabass</option>
                    </NativeSelect>
                </FormControl>
            </form>
        </Paper>
    )
}
