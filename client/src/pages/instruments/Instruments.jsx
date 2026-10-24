import React, { useContext, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router';
import Container from '../../components/container/Container';
import SearchField from '../../components/ui/SearchField';
import FacetFilter from '../../components/ui/FacetFilter';
import RecordTable from '../../components/ui/RecordTable';
import Loading from '../../components/loading';
import { FACETS, searchTerms, filterRecords, facetCounts, sortRecords, toCsv } from '../../utils/filterRecords';
import './instruments.css';

import TromboneContext from '../../context/trombones';

// search, filters and sort live in the URL so a filtered list can be bookmarked or shared
export default function Instruments() {
    const { trombones, loaded, error } = useContext(TromboneContext);
    const [params, setParams] = useSearchParams();
    const [filtersOpen, setFiltersOpen] = useState(false);

    const query = params.get('q') || '';
    const sortKey = params.get('sort') || 'date';
    const sortDir = params.get('dir') === 'desc' ? 'desc' : 'asc';
    const selected = Object.fromEntries(FACETS.map(f => [f.key, params.getAll(f.key)]));
    const activeFilters = FACETS.reduce((n, f) => n + selected[f.key].length, 0);
    const terms = useMemo(() => searchTerms(query), [query]);

    const results = useMemo(
        () => sortRecords(filterRecords(trombones, terms, selected), sortKey, sortDir),
        // selected is rebuilt every render; params captures it
        [trombones, terms, params, sortKey, sortDir],
    );
    const facets = useMemo(() => facetCounts(trombones, terms, selected), [trombones, terms, params]);

    function update(change) {
        const next = new URLSearchParams(params);
        change(next);
        setParams(next, { replace: true });
    }

    function setQuery(value) {
        update(next => (value ? next.set('q', value) : next.delete('q')));
    }

    function toggle(key, value, checked) {
        update(next => {
            const values = next.getAll(key).filter(v => v !== value);
            next.delete(key);
            (checked ? [...values, value] : values).forEach(v => next.append(key, v));
        });
    }

    function sortBy(key) {
        update(next => {
            const dir = key === sortKey && sortDir === 'asc' ? 'desc' : 'asc';
            next.set('sort', key);
            next.set('dir', dir);
        });
    }

    function clearAll() {
        setParams(new URLSearchParams(), { replace: true });
    }

    function exportCsv() {
        const blob = new Blob([toCsv(results, window.location.origin)], { type: 'text/csv;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'historic-trombones.csv';
        link.click();
        URL.revokeObjectURL(url);
    }

    const summary = [
        query && `matching “${query}”`,
        ...FACETS.filter(f => selected[f.key].length).map(f => `${f.title}: ${selected[f.key].join(', ')}`),
    ].filter(Boolean).join(' · ');

    return (
        <div className="instruments">
            <aside className={`instrumentsFilters ${filtersOpen ? 'open' : ''}`} id="filters" aria-label="Filters">
                {facets.map(facet => (
                    <FacetFilter
                        key={facet.key}
                        title={facet.title}
                        options={facet.options}
                        selected={selected[facet.key]}
                        onToggle={(value, checked) => toggle(facet.key, value, checked)}
                    />
                ))}
            </aside>

            <Container>
                <h1 className="visually-hidden">Instruments</h1>
                <div className="instrumentsToolbar">
                    <SearchField value={query} onChange={(e) => setQuery(e.target.value)} />
                    <button
                        type="button"
                        className="btn btn-secondary filtersToggle"
                        aria-expanded={filtersOpen}
                        aria-controls="filters"
                        onClick={() => setFiltersOpen(!filtersOpen)}
                    >
                        Filters{activeFilters ? ` (${activeFilters})` : ''}
                    </button>
                    <button type="button" className="btn btn-secondary" onClick={exportCsv} disabled={!results.length}>
                        Export CSV
                    </button>
                </div>

                {loaded ? (
                    <>
                        <p className="instrumentsMeta" aria-live="polite">
                            <span>
                                {results.length === trombones.length
                                    ? `${trombones.length} records`
                                    : `${results.length} of ${trombones.length} records`}
                                {summary && ` · ${summary}`}
                            </span>
                            {(query || activeFilters > 0) && (
                                <button type="button" className="btn btn-quiet" onClick={clearAll}>Clear all</button>
                            )}
                        </p>
                        {results.length ? (
                            <RecordTable
                                records={results}
                                sortKey={sortKey}
                                sortDir={sortDir}
                                onSort={sortBy}
                                terms={terms}
                                caption="Trombones matching the current search and filters"
                            />
                        ) : (
                            <p className="instrumentsEmpty">No records match. Try fewer words or clear a filter.</p>
                        )}
                    </>
                ) : (
                    error ? <p>{error}</p> : <Loading message="Loading…" positionStatic />
                )}
            </Container>
        </div>
    );
}
