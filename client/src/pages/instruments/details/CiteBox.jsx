import React, { useState } from 'react';
import { citation } from '../../../utils/records';

const FORMATS = [['chicago', 'Chicago'], ['short', 'Short'], ['bibtex', 'BibTeX']];

export default function CiteBox({ trombone }) {
    const [format, setFormat] = useState('chicago');
    const [copied, setCopied] = useState(false);
    const text = citation(trombone, format, `${window.location.origin}/details/${trombone._id}`);

    function copy() {
        navigator.clipboard.writeText(text).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }).catch(() => window.prompt('Copy this citation:', text));
    }

    return (
        <section className="sideBox" aria-labelledby="citeTitle">
            <h2 id="citeTitle">Cite this record</h2>
            <div className="citeTabs" role="group" aria-label="Citation format">
                {FORMATS.map(([key, label]) => (
                    <button key={key} type="button" aria-pressed={format === key} onClick={() => setFormat(key)}>{label}</button>
                ))}
            </div>
            <pre className="citeText">{text}</pre>
            <button type="button" className="btn btn-secondary" onClick={copy}>
                {copied ? 'Copied' : 'Copy citation'}
            </button>
        </section>
    );
}
