import React from "react";
import { Paper, NativeSelect, InputLabel, Input, FormControl, TextField } from "@material-ui/core";
import "./searchBar.css";


export default function SearchBar({ searchBar }) {
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
                        className="validate"
                        value={searchBar.pitch}
                        onChange={(e) => searchBar.setPitch(e.target.value)}
                    />
                </FormControl>

                <FormControl className="input-field">
                    <InputLabel htmlFor="typeSelect" style={{ padding: '10px' }}>Type</InputLabel>
                    <NativeSelect
                        className="browser-default"
                        name="type"
                        onChange={(e) => searchBar.setType(e.target.value)}
                        input={<Input id="typeSelect" name="type" />}
                    >
                        <option value="" defaultValue></option>
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
