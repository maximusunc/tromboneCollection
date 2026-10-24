import { TYPES, CITIES, clean, fold } from './records';

// facet key -> how to read the value from an enriched record
export const FACETS = [
    { key: 'type', title: 'Type', values: [...TYPES], read: r => r.type },
    { key: 'century', title: 'Century', values: ['16th century', '17th century', '18th century', '19th century', 'Undated'], read: r => r.century },
    { key: 'city', title: 'Maker city', values: [...CITIES.map(c => c.label), 'Other'], read: r => r.city },
    { key: 'status', title: 'Status', values: ['Dated', 'Circa', 'Partial'], read: r => ({ dated: 'Dated', circa: 'Circa', partial: 'Partial' })[r.status] },
];

export function searchTerms(query) {
    return fold(query).split(/\s+/).filter(Boolean);
}

function matches(record, terms, selected, skipFacet) {
    if (!terms.every(term => record.search.includes(term))) {
        return false;
    }
    return FACETS.every(facet => facet.key === skipFacet
        || !selected[facet.key].length
        || selected[facet.key].includes(facet.read(record)));
}

export function filterRecords(records, terms, selected) {
    return records.filter(record => matches(record, terms, selected));
}

// counts for each facet value, given the search and every other facet's selection
export function facetCounts(records, terms, selected) {
    return FACETS.map(facet => {
        const pool = records.filter(record => matches(record, terms, selected, facet.key));
        return {
            ...facet,
            options: facet.values
                .map(value => ({ value, count: pool.filter(record => facet.read(record) === value).length }))
                .filter(option => option.count || selected[facet.key].includes(option.value)),
        };
    });
}

const TYPE_ORDER = r => (TYPES.indexOf(r.type) + 1) || TYPES.length + 1;

const SORTS = {
    date: (a, b) => a.year - b.year,
    maker: (a, b) => clean(a.maker).localeCompare(clean(b.maker)),
    type: (a, b) => TYPE_ORDER(a) - TYPE_ORDER(b) || a.year - b.year,
    pitch: (a, b) => (!a.pitch) - (!b.pitch) || clean(a.pitch).localeCompare(clean(b.pitch)),
    location: (a, b) => (!a.holding) - (!b.holding) || a.holding.localeCompare(b.holding),
};

export function sortRecords(records, key, dir) {
    const compare = SORTS[key] || SORTS.date;
    const sorted = [...records].sort(compare);
    return dir === 'desc' ? sorted.reverse() : sorted;
}

const CSV_FIELDS = ['date', 'maker', 'type', 'pitch', 'location', 'signature', 'mouthpiece', 'dimensions', 'provenance', 'literature', 'remarks'];

export function toCsv(records, origin) {
    const escape = value => `"${String(value || '').replace(/"/g, '""')}"`;
    const header = [...CSV_FIELDS, 'url'].join(',');
    const rows = records.map(record => [...CSV_FIELDS.map(field => record[field]), `${origin}/details/${record._id}`].map(escape).join(','));
    return [header, ...rows].join('\r\n');
}
