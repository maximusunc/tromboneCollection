import React from 'react';
import { fold } from '../../utils/records';

// marks each search term in text; fold() keeps one character per character for Latin text, so indexes line up
export default function Highlight({ text, terms }) {
    if (!text || !terms || !terms.length) {
        return text || null;
    }
    const folded = fold(text);
    if (folded.length !== text.length) {
        return text;
    }
    const ranges = [];
    terms.forEach((term) => {
        let i = folded.indexOf(term);
        while (term && i !== -1) {
            ranges.push([i, i + term.length]);
            i = folded.indexOf(term, i + term.length);
        }
    });
    if (!ranges.length) {
        return text;
    }
    ranges.sort((a, b) => a[0] - b[0]);
    const parts = [];
    let pos = 0;
    ranges.forEach(([start, end]) => {
        if (start < pos) {
            return;
        }
        parts.push(text.slice(pos, start), <mark key={start}>{text.slice(start, end)}</mark>);
        pos = end;
    });
    parts.push(text.slice(pos));
    return parts;
}
