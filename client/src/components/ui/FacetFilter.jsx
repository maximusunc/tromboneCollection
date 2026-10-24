import React from 'react';
import './ui.css';

// options: [{ value, count }]; selected: array of values
export default function FacetFilter({ title, options, selected, onToggle }) {
    const max = Math.max(1, ...options.map(option => option.count));
    return (
        <fieldset className="facet">
            <legend>{title}</legend>
            <ul>
                {options.map(({ value, count }) => (
                    <li key={value}>
                        <label className={count ? '' : 'empty'}>
                            <input
                                type="checkbox"
                                checked={selected.includes(value)}
                                onChange={(e) => onToggle(value, e.target.checked)}
                            />
                            <span>{value}</span>
                            <span className="facetCount">{count}</span>
                        </label>
                        <div className="facetBar" aria-hidden="true">
                            <i style={{ width: `${Math.round(100 * count / max)}%` }} />
                        </div>
                    </li>
                ))}
            </ul>
        </fieldset>
    );
}
