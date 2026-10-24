import React from 'react';
import { Link } from 'react-router';
import { literatureRefs } from '../../utils/records';
import './ui.css';

const FIELDS = [
    ['type', 'Type'],
    ['pitch', 'Pitch'],
    ['location', 'Location'],
    ['signature', 'Signature'],
    ['mouthpiece', 'Mouthpiece'],
    ['dimensions', 'Dimensions'],
    ['provenance', 'Provenance'],
    ['external_link', 'External link'],
    ['literature', 'Literature'],
    ['remarks', 'Remarks'],
];

function value(trombone, field, linkRefs) {
    const text = trombone[field];
    switch (field) {
        case 'signature':
            return <span className="inscription">{text}</span>;
        case 'external_link':
            return <a href={text} target="_blank" rel="noreferrer noopener">{text}</a>;
        case 'literature':
            if (!linkRefs) {
                return text;
            }
            return (
                <span className="refs">
                    {literatureRefs(text).map((ref, i) => (ref.key ? (
                        <Link key={i} className="ref" to={`/bibliography?ref=${encodeURIComponent(ref.key)}`}>{ref.text}</Link>
                    ) : (
                        <span key={i} className="ref">{ref.text}</span>
                    )))}
                </span>
            );
        default:
            return text;
    }
}

// the catalogue entry as a definition list; maker and date are shown by the page heading
export default function RecordFields({ trombone, linkRefs = true }) {
    const footnotes = trombone.footnotes || [];
    return (
        <dl className="recordFields">
            {FIELDS.filter(([field]) => trombone[field] && String(trombone[field]).trim()).map(([field, label]) => (
                <React.Fragment key={field}>
                    <dt>{label}</dt>
                    <dd>{value(trombone, field, linkRefs)}</dd>
                </React.Fragment>
            ))}
            {footnotes.length > 0 && (
                <>
                    <dt>Footnotes</dt>
                    <dd>
                        <ol className="footnotes">
                            {footnotes.map((footnote, i) => <li key={i}>{footnote}</li>)}
                        </ol>
                    </dd>
                </>
            )}
        </dl>
    );
}
