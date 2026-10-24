import React from 'react';
import { STATUSES } from '../../utils/records';
import './ui.css';

export default function Badge({ tone = 'type', children }) {
    return (
        <span className={`badge badge-${tone}`}>
            {children || STATUSES[tone]}
        </span>
    );
}
