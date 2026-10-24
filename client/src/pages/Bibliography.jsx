import React, { useContext, useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router";
import Container from "../components/container/Container";
import SearchField from "../components/ui/SearchField";
import TromboneContext from "../context/trombones";
import { fold, refKey } from "../utils/records";
import BIBLIOGRAPHY from "../data/bibliography.json";
import "./bibliography.css";

function slug(key) {
    return fold(key).replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

// first letter of the key, ignoring accents; numbers file under "#"
function letterOf(key) {
    const first = fold(key).charAt(0).toUpperCase();
    return /[A-Z]/.test(first) ? first : "#";
}

const ENTRIES = BIBLIOGRAPHY.map((entry, i) => ({
    ...entry,
    id: slug(entry.key) || `entry-${i}`,
    ref: refKey(entry.key),
    letter: letterOf(entry.key || entry.text),
    search: fold(`${entry.key} ${entry.text}`),
}));

export default function Bibliography() {
    const { trombones, loaded } = useContext(TromboneContext);
    const [params] = useSearchParams();
    const ref = params.get("ref");
    const [filter, setFilter] = useState("");

    // how many records cite each entry, keyed by the normalised short reference
    const cited = useMemo(() => {
        const counts = {};
        trombones.forEach(record => new Set(record.refs).forEach(key => {
            counts[key] = (counts[key] || 0) + 1;
        }));
        return counts;
    }, [trombones]);

    const target = ref ? ENTRIES.find(entry => entry.ref === refKey(ref)) : null;

    useEffect(() => {
        if (target) {
            document.getElementById(target.id)?.scrollIntoView({ block: "center" });
        }
    }, [target]);

    const terms = fold(filter).split(/\s+/).filter(Boolean);
    const shown = ENTRIES.filter(entry => terms.every(term => entry.search.includes(term)));
    const letters = [...new Set(ENTRIES.map(entry => entry.letter))];
    const groups = letters
        .map(letter => ({ letter, entries: shown.filter(entry => entry.letter === letter) }))
        .filter(group => group.entries.length);

    return (
        <Container>
            <h1 className="pageTitle">Bibliography</h1>
            <p className="muted">
                {ENTRIES.length} works cited in the catalogue. Records refer to them by the short reference in the left column.
            </p>
            {ref && !target && (
                <p className="bibNotice">
                    “{ref}” isn’t listed in the bibliography yet.
                </p>
            )}

            <div className="bibTools">
                <SearchField
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    label="Filter the bibliography"
                    placeholder="Filter by author, year or title…"
                />
                <nav className="bibLetters" aria-label="Jump to letter">
                    {letters.map(letter => (
                        groups.some(group => group.letter === letter)
                            ? <a key={letter} href={`#letter-${letter}`}>{letter}</a>
                            : <span key={letter} aria-hidden="true">{letter}</span>
                    ))}
                </nav>
            </div>

            {groups.length ? groups.map(group => (
                <section key={group.letter} className="bibGroup" aria-labelledby={`letter-${group.letter}`}>
                    <h2 id={`letter-${group.letter}`}>{group.letter}</h2>
                    {group.entries.map(entry => {
                        const count = cited[entry.ref] || 0;
                        return (
                            <div key={entry.id} id={entry.id} className={`bibEntry ${entry === target ? "target" : ""}`}>
                                <div className="bibKey">{entry.key}</div>
                                <div className="bibText">
                                    {entry.text}
                                    {loaded && count > 0 && (
                                        <Link className="bibCited" to={`/instruments?cites=${encodeURIComponent(entry.key)}`}>
                                            Cited in {count} {count === 1 ? "record" : "records"}
                                        </Link>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </section>
            )) : (
                <p className="bibNotice">No entries match “{filter}”.</p>
            )}
        </Container>
    );
};
