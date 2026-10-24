import React, { useContext, useMemo, useState } from "react";
import { Link, useNavigate } from 'react-router';
import Container from "../../components/container/Container";
import SearchField from "../../components/ui/SearchField";
import Loading, { LoadError } from "../../components/loading";
import RecordTable from "../../components/ui/RecordTable";
import TromboneContext from "../../context/trombones";
import { FACETS } from "../../utils/filterRecords";
import './home.css';
import tromboneCover from './B&W Sackbut Cover Photo_4.png';

const GLANCE = ['type', 'century', 'city'];

export default function Home() {
  const navigate = useNavigate();
  const { trombones, loaded, error } = useContext(TromboneContext);
  const [query, setQuery] = useState('');

  const glance = useMemo(() => FACETS.filter(f => GLANCE.includes(f.key)).map(facet => ({
    ...facet,
    rows: facet.values
      .map(value => ({ value, count: trombones.filter(r => facet.read(r) === value).length }))
      .filter(row => row.count && row.value !== 'Other'),
  })), [trombones]);

  function search(e) {
    e.preventDefault();
    navigate(query ? `/instruments?q=${encodeURIComponent(query)}` : '/instruments');
  }

  return (
    <Container>
      <section className="homeIntro">
        <div>
          <h1>A catalogue of trombones made before 1800</h1>
          <p>
            Based on information gathered from museums and private collections across the globe. Search by maker, date, place, inscription, holding siglum or literature reference.
          </p>
          <p className="muted">
            Though every effort has been made to provide current and precise information, the database makes no guarantee concerning accuracy. Corrections and new records are welcome through the <Link to="/contact">contact page</Link>.
          </p>
          <form className="homeSearch" onSubmit={search} role="search">
            <SearchField value={query} onChange={(e) => setQuery(e.target.value)} />
            <button type="submit" className="btn btn-primary">Search</button>
          </form>
          <div className="homeLinks">
            <Link className="btn btn-quiet" to="/instruments">Browse all {loaded ? trombones.length : ''} records</Link>
            <Link className="btn btn-quiet" to="/how-to-use">How to read a record</Link>
            <Link className="btn btn-quiet" to="/contact">Suggest a record</Link>
          </div>
        </div>
        <figure className="homePhoto">
          <img src={tromboneCover} alt="Parts of historic trombones laid out on dark velvet" />
          <figcaption>Photo: Katie Rose Hand</figcaption>
        </figure>
      </section>

      {!loaded && (error ? <LoadError message={error} /> : <Loading message="Loading the collection…" rows={5} />)}
      {loaded && (
        <>
          <section className="homeGlance" aria-labelledby="glanceTitle">
            <div className="homeGlanceHead">
              <h2 id="glanceTitle">The collection at a glance</h2>
              <span><strong>{trombones.length}</strong> records</span>
            </div>
            <div className="homeGlanceCols">
              {glance.map(facet => (
                <div key={facet.key}>
                  <h3 className="label">By {facet.title.toLowerCase()}</h3>
                  <table>
                    <tbody>
                      {facet.rows.map(row => (
                        <tr key={row.value}>
                          <td><Link to={`/instruments?${facet.key}=${encodeURIComponent(row.value)}`}>{row.value}</Link></td>
                          <td>{row.count}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          </section>

          <section aria-labelledby="earliestTitle">
            <div className="homeGlanceHead">
              <h2 id="earliestTitle">Earliest instruments</h2>
              <Link to="/instruments">View all by date →</Link>
            </div>
            <RecordTable records={trombones.slice(0, 5)} />
          </section>
        </>
      )}
    </Container>
  );
};
