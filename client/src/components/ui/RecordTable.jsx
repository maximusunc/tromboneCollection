import React from 'react';
import { Link } from 'react-router';
import Badge from './Badge';
import Highlight from './Highlight';
import { clean } from '../../utils/records';
import './ui.css';

export const COLUMNS = [
    { key: 'date', label: 'Date' },
    { key: 'maker', label: 'Maker' },
    { key: 'type', label: 'Type' },
    { key: 'pitch', label: 'Pitch' },
    { key: 'location', label: 'Location' },
    { key: 'status', label: 'Status' },
];

export default function RecordTable({ records, columns = COLUMNS.map(c => c.key), sortKey, sortDir = 'asc', onSort, terms, caption }) {
    const cols = COLUMNS.filter(c => columns.includes(c.key));

    function cell(record, key) {
        switch (key) {
            case 'date':
                return <td key={key} className="colDate">{clean(record.date) || '—'}</td>;
            case 'maker':
                return (
                    <td key={key} className="colMaker">
                        <Link to={`/details/${record._id}`}>
                            <Highlight text={clean(record.maker)} terms={terms} />
                        </Link>
                    </td>
                );
            case 'type':
                return <td key={key} className="colType">{record.type || '—'}</td>;
            case 'pitch':
                return (
                    <td key={key} className="colPitch">
                        <span className="clamp" title={record.pitch}>
                            {record.pitch ? <Highlight text={clean(record.pitch)} terms={terms} /> : '—'}
                        </span>
                    </td>
                );
            case 'location':
                return (
                    <td key={key} className="colLocation">
                        <Highlight text={record.holding} terms={terms} />
                    </td>
                );
            case 'status':
                return <td key={key} className="colStatus"><Badge tone={record.status} /></td>;
            default:
                return null;
        }
    }

    return (
        <div className="tableWrap">
            <table className="recordTable">
                {caption && <caption className="visually-hidden">{caption}</caption>}
                <thead>
                    <tr>
                        {cols.map(c => {
                            const sorted = c.key === sortKey;
                            return (
                                <th
                                    key={c.key}
                                    scope="col"
                                    aria-sort={sorted ? (sortDir === 'desc' ? 'descending' : 'ascending') : undefined}
                                >
                                    {onSort && c.key !== 'status' ? (
                                        <button type="button" onClick={() => onSort(c.key)}>
                                            {c.label}{sorted ? (sortDir === 'desc' ? ' ↓' : ' ↑') : ''}
                                        </button>
                                    ) : c.label}
                                </th>
                            );
                        })}
                    </tr>
                </thead>
                <tbody>
                    {records.map(record => (
                        <tr key={record._id}>
                            {cols.map(c => cell(record, c.key))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
