import React, { useContext } from "react";
import { Link, useParams } from "react-router";
import RecordFields from "../components/ui/RecordFields";
import Loading, { LoadError } from "../components/loading";
import TromboneContext from "../context/trombones";
import { clean } from "../utils/records";

// This page is for printing purposes mainly, minimal css
export default function MinDetails() {
    const { id } = useParams();
    const { trombones, loaded, error } = useContext(TromboneContext);
    const trombone = trombones.find(tbone => tbone._id === id);

    if (!loaded) {
        return (
            <div id="printContents">
                {error ? <LoadError message={error} /> : <Loading message="Loading record…" rows={8} />}
            </div>
        );
    }
    if (!trombone) {
        return <p style={{ padding: 16 }}>Record not found. <Link to="/instruments">Browse all instruments</Link>.</p>;
    }

    return (
        <div id="printContents">
            {/* hidden when printing, see pages.css */}
            <div id="minLinks">
                <Link to={"/details/" + id} className="btn btn-quiet">← Back to record</Link>
                <button className="btn btn-primary" type="button" onClick={() => window.print()}>Print or save as PDF</button>
            </div>
            <p className="label">Historic Trombone Database</p>
            <h1>{clean(trombone.date)} · {clean(trombone.maker)}</h1>
            <RecordFields trombone={trombone} linkRefs={false} />
            <p className="muted printSource">{window.location.origin}/details/{id}</p>
        </div>
    );
};
