import React from 'react';
import './ui.css';

export default function SearchField({ value, onChange, label = 'Search the collection', placeholder = 'Search maker, date, inscription, siglum, literature…', ...rest }) {
    return (
        <label className="searchField">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                <circle cx="7" cy="7" r="5" />
                <path d="M11 11l3.5 3.5" />
            </svg>
            <span className="visually-hidden">{label}</span>
            <input type="search" value={value} onChange={onChange} placeholder={placeholder} {...rest} />
        </label>
    );
}
