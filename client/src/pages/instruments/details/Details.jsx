import React, { useContext, useEffect } from 'react';
import { Link, useParams } from 'react-router';
import Container from '../../../components/container/Container';
import Loading from '../../../components/loading';
import Badge from '../../../components/ui/Badge';
import RecordFields from '../../../components/ui/RecordFields';
import RecordTable from '../../../components/ui/RecordTable';
import Gallery from './Gallery';
import CiteBox from './CiteBox';
import TromboneContext from '../../../context/trombones';
import { clean, makerKey, siglum } from '../../../utils/records';
import './details.css';

function recordLabel(trombone) {
    return `${clean(trombone.date)} ${clean(trombone.maker)}`.trim();
}

export default function Details() {
    const { id } = useParams();
    const { trombones, loaded, error } = useContext(TromboneContext);
    const index = trombones.findIndex(tbone => tbone._id === id);
    const trombone = trombones[index];

    useEffect(() => {
        if (trombone) {
            document.title = `${recordLabel(trombone)} · Historic Trombone Database`;
        }
        return () => { document.title = 'Historic Trombone Database'; };
    }, [trombone]);

    if (!loaded) {
        return <Container>{error ? <p>{error}</p> : <Loading message="Loading…" positionStatic />}</Container>;
    }
    if (!trombone) {
        return (
            <Container>
                <h1 className="pageTitle">Record not found</h1>
                <p>There is no instrument with this id. <Link to="/instruments">Browse all instruments</Link>.</p>
            </Container>
        );
    }

    const prev = trombones[index - 1];
    const next = trombones[index + 1];
    const key = makerKey(trombone);
    const related = key ? trombones.filter(tbone => tbone._id !== id && makerKey(tbone) === key) : [];
    const holdingSiglum = siglum(trombone);

    return (
        <Container>
            <nav className="recordNav" aria-label="Record navigation">
                <span>
                    <Link to="/instruments">Instruments</Link>
                    {trombone.type && <> › <Link to={`/instruments?type=${encodeURIComponent(trombone.type)}`}>{trombone.type}</Link></>}
                    {' › '}<span aria-current="page">{recordLabel(trombone)}</span>
                </span>
                <span className="recordNavSteps">
                    {prev && <Link className="btn btn-quiet" to={`/details/${prev._id}`} rel="prev">← {recordLabel(prev)}</Link>}
                    {next && <Link className="btn btn-quiet" to={`/details/${next._id}`} rel="next">{recordLabel(next)} →</Link>}
                </span>
            </nav>

            <div className="record">
                <div className="recordMedia">
                    <Gallery images={trombone.images} alt={`Trombone by ${clean(trombone.maker)}`} />
                </div>

                <article className="recordMain">
                    <div className="recordMeta">
                        <span className="recordDate">{clean(trombone.date)}</span>
                        <Badge tone={trombone.status} />
                        {trombone.type && <Badge>{trombone.type}</Badge>}
                    </div>
                    <h1 className="recordTitle">{clean(trombone.maker)}</h1>
                    <RecordFields trombone={trombone} />
                    <div className="recordActions">
                        <Link className="btn btn-secondary" to={`/api/details/${id}`}>Printable version</Link>
                        <Link className="btn btn-quiet" to="/contact">Suggest a correction</Link>
                    </div>
                </article>

                <aside className="recordSide">
                    <CiteBox trombone={trombone} />
                    {trombone.holding && (
                        <section className="sideBox" aria-labelledby="holdingTitle">
                            <h2 id="holdingTitle">Holding</h2>
                            <p className="mono">{trombone.holding}</p>
                            {holdingSiglum && (
                                <p>
                                    <Link to={`/instruments?q=${encodeURIComponent(holdingSiglum)}`}>
                                        Search for {holdingSiglum} →
                                    </Link>
                                </p>
                            )}
                            <p><Link to="/how-to-use#sigla">What the sigla mean</Link></p>
                        </section>
                    )}
                </aside>
            </div>

            {related.length > 0 && (
                <section className="related" aria-labelledby="relatedTitle">
                    <h2 id="relatedTitle">Other instruments by {clean(trombone.maker).split(/[,;(]/)[0].trim()} ({related.length})</h2>
                    <RecordTable records={related} columns={['date', 'maker', 'type', 'location', 'status']} />
                </section>
            )}
        </Container>
    );
}
