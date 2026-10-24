import React, { useContext, useState } from "react";
import { Link, useSearchParams } from "react-router";
import Container from "../../components/container/Container";
import TromboneContext from "../../context/trombones";
import { TYPES, clean } from "../../utils/records";
import tromboneForm from "./historicTromboneForm.pdf";
import "./contact.css";

// assembled at runtime so the address isn't sitting in the page as plain text
const ADDRESS = [109, 107, 114, 105, 115, 64, 101, 109, 97, 105, 108, 46, 117, 110, 99, 46, 101, 100, 117]
    .map(code => String.fromCharCode(code)).join("");

const KINDS = {
    correction: "Correction to an existing record",
    addition: "An instrument not yet in the catalogue",
    other: "Something else",
};

function recordLabel(record) {
    return `${clean(record.date)} ${clean(record.maker)}`.trim();
}

function compose(kind, fields, record) {
    const lines = [];
    const add = (label, value) => value && value.trim() && lines.push(`${label}: ${value.trim()}`);
    if (kind === "correction") {
        add("Record", record ? `${recordLabel(record)} (${window.location.origin}/details/${record._id})` : fields.instrument);
        lines.push("");
        lines.push("Suggested change:", fields.change.trim());
    } else if (kind === "addition") {
        add("Maker", fields.maker);
        add("Date", fields.date);
        add("Type", fields.type);
        add("Location", fields.location);
        lines.push("");
        lines.push("Other known details:", fields.details.trim());
    } else {
        lines.push(fields.message.trim());
    }
    lines.push("");
    add("Source", fields.source);
    lines.push("");
    add("From", [fields.name, fields.email].filter(Boolean).join(", "));
    const subject = kind === "correction"
        ? `Correction: ${record ? recordLabel(record) : fields.instrument}`
        : kind === "addition" ? `New instrument: ${[fields.date, fields.maker].filter(Boolean).join(" ")}` : "Message";
    return { subject: `[Historic Trombone Database] ${subject}`, body: lines.join("\n").replace(/\n{3,}/g, "\n\n").trim() };
}

const EMPTY = { instrument: "", change: "", maker: "", date: "", type: "", location: "", details: "", message: "", source: "", name: "", email: "" };

export default function Contact() {
    const { trombones } = useContext(TromboneContext);
    const [params] = useSearchParams();
    const record = trombones.find(tbone => tbone._id === params.get("record"));
    const [kind, setKind] = useState(params.get("record") ? "correction" : "addition");
    const [fields, setFields] = useState(EMPTY);
    const [composed, setComposed] = useState(null);
    const [copied, setCopied] = useState(false);
    const [error, setError] = useState("");

    const set = name => e => setFields({ ...fields, [name]: e.target.value });

    function submit(e) {
        e.preventDefault();
        if (kind === "addition" && !["maker", "date", "type", "location", "details"].some(name => fields[name].trim())) {
            setError("Add at least one detail about the instrument.");
            return;
        }
        setError("");
        const message = compose(kind, fields, record);
        setComposed(message);
        window.location.href = `mailto:${ADDRESS}?subject=${encodeURIComponent(message.subject)}&body=${encodeURIComponent(message.body)}`;
    }

    function copy() {
        navigator.clipboard.writeText(`To: ${ADDRESS}\nSubject: ${composed.subject}\n\n${composed.body}`)
            .then(() => setCopied(true))
            .catch(() => setCopied(false));
    }

    return (
        <Container>
            <h1 className="pageTitle">Contact</h1>
            <p>
                Suggest a correction to a record or tell us about an instrument that isn’t in the catalogue. Sending opens your email app with the message filled in; we review every suggestion before the catalogue is updated.
            </p>

            <form className="contactForm" onSubmit={submit}>
                <fieldset className="contactKinds">
                    <legend>What would you like to send?</legend>
                    {Object.entries(KINDS).map(([value, label]) => (
                        <label key={value}>
                            <input type="radio" name="kind" value={value} checked={kind === value} onChange={() => setKind(value)} />
                            {label}
                        </label>
                    ))}
                </fieldset>

                {kind === "correction" && (
                    <div className="contactSection">
                        {record ? (
                            <div className="contactRecord">
                                <span className="label">Record</span>
                                <Link to={`/details/${record._id}`}>{recordLabel(record)}</Link>
                                <span className="mono muted">{record.holding}</span>
                            </div>
                        ) : (
                            <label className="field">
                                <span>Which instrument?</span>
                                <input value={fields.instrument} onChange={set("instrument")} required placeholder="e.g. 1593 Anton Schnitzer, D-KA 1905/161" />
                                <small>Tip: use “Suggest a correction” on a record page to fill this in.</small>
                            </label>
                        )}
                        <label className="field">
                            <span>Suggested change</span>
                            <textarea value={fields.change} onChange={set("change")} required rows={6} placeholder="Which field is wrong or missing, and what it should say." />
                        </label>
                    </div>
                )}

                {kind === "addition" && (
                    <div className="contactSection contactGrid">
                        <label className="field">
                            <span>Maker</span>
                            <input value={fields.maker} onChange={set("maker")} placeholder="Name and city, if known" />
                        </label>
                        <label className="field">
                            <span>Date (if known)</span>
                            <input value={fields.date} onChange={set("date")} placeholder="e.g. 1693, ca. 1700" />
                        </label>
                        <label className="field">
                            <span>Type</span>
                            <select value={fields.type} onChange={set("type")}>
                                <option value="">Unknown</option>
                                {TYPES.map(type => <option key={type}>{type}</option>)}
                            </select>
                        </label>
                        <label className="field">
                            <span>Location</span>
                            <input value={fields.location} onChange={set("location")} placeholder="Museum or collection, inventory number" />
                        </label>
                        <label className="field wide">
                            <span>Other known details</span>
                            <textarea value={fields.details} onChange={set("details")} rows={6} placeholder="Signature or inscription, pitch, dimensions, provenance, remarks…" />
                        </label>
                    </div>
                )}

                {kind === "other" && (
                    <div className="contactSection">
                        <label className="field">
                            <span>Message</span>
                            <textarea value={fields.message} onChange={set("message")} required rows={6} />
                        </label>
                    </div>
                )}

                <div className="contactSection contactGrid">
                    <label className="field wide">
                        <span>Source <small>(optional)</small></span>
                        <input value={fields.source} onChange={set("source")} placeholder="Publication, museum catalogue, or personal examination" />
                    </label>
                    <label className="field">
                        <span>Your name <small>(optional)</small></span>
                        <input value={fields.name} onChange={set("name")} autoComplete="name" />
                    </label>
                    <label className="field">
                        <span>Your email <small>(optional)</small></span>
                        <input type="email" value={fields.email} onChange={set("email")} autoComplete="email" />
                    </label>
                </div>

                <div className="contactActions">
                    <button type="submit" className="btn btn-primary">Open in email app</button>
                    <p className="contactError" role="alert">{error}</p>
                </div>
            </form>

            {composed && (
                <section className="contactFallback" aria-live="polite">
                    <h2>Didn’t an email open?</h2>
                    <p>
                        Send this message to <a href={`mailto:${ADDRESS}`}>{ADDRESS}</a> from any email account.
                    </p>
                    <pre>{`Subject: ${composed.subject}\n\n${composed.body}`}</pre>
                    <button type="button" className="btn btn-secondary" onClick={copy}>{copied ? "Copied" : "Copy message"}</button>
                </section>
            )}

            <p className="muted contactPdf">
                Prefer paper? <a className="contactLink" href={tromboneForm} download="HistoricTromboneForm.pdf">Download the PDF form</a> and email it to us.
            </p>
        </Container>
    );
}
