// Derived fields for trombone records. The raw fields are free text copied from
// the printed catalogue, so these are best-effort readings used for sorting and filtering.

export const TYPES = ['Soprano', 'Alto', 'Tenor', 'Bass', 'Contrabass'];

export const CITIES = [
    { label: 'Nuremberg', pattern: /nuremberg|nürnberg|nuremburg/i },
    { label: 'Vienna', pattern: /vienna|wien/i },
    { label: 'Pfaffendorf', pattern: /pfaffendorf/i },
    { label: 'Stockholm', pattern: /stockholm/i },
    { label: 'Leipzig', pattern: /leipzig/i },
    { label: 'Dresden', pattern: /dresden/i },
    { label: 'Breslau', pattern: /breslau/i },
];

export const STATUSES = {
    dated: 'Dated',
    circa: 'Circa',
    partial: 'Partial',
};

// first year mentioned in the date, or a century written as "18c" / "17th century"
export function sortYear(record) {
    const date = record.date || '';
    const year = date.match(/1\d{3}/);
    if (year) {
        return Number(year[0]);
    }
    const century = date.match(/(\d{2})(?:c|th)/i);
    return century ? (Number(century[1]) - 1) * 100 + 50 : Infinity;
}

export function century(record) {
    const year = sortYear(record);
    if (year === Infinity) {
        return 'Undated';
    }
    const c = Math.floor(year / 100) + 1;
    return `${c}th century`;
}

export function status(record) {
    const text = `${record.maker} ${record.date}`;
    if (/\bonly\b|sec\.:/i.test(text)) {
        return 'partial';
    }
    if (/ca\.|\?|\dc\b|century|\d\/\d/i.test(record.date || '')) {
        return 'circa';
    }
    return 'dated';
}

export function city(record) {
    const match = CITIES.find(({ pattern }) => pattern.test(record.maker || ''));
    return match ? match.label : 'Other';
}

// the holding siglum and inventory number, without the notes that often follow them
export function holding(record) {
    return (record.location || '').split(';')[0].trim();
}

export function siglum(record) {
    const match = holding(record).match(/^[A-Z]{1,3}-[A-Za-zÜÖ()]+/);
    return match ? match[0] : '';
}

// footnote and editorial markers (¹, ****) that clutter short displays
export function clean(text) {
    return (text || '').replace(/[¹²³⁴⁵⁶⁷⁸⁹⁰]/g, '').replace(/\*+/g, '').trim();
}

export function fold(text) {
    return (text || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
}

const SEARCH_FIELDS = ['maker', 'date', 'type', 'location', 'signature', 'pitch', 'provenance', 'literature', 'remarks'];

export function searchText(record) {
    return fold(SEARCH_FIELDS.map(field => record[field]).join(' '));
}

// "Anton Schnitzer Sr., Nuremberg" -> "anton schnitzer"
export function makerKey(record) {
    const name = (record.maker || '')
        .replace(/^\(.*?\)\s*/, '')
        .replace(/^bell sec\.:\s*/i, '')
        .split(/[,;(]/)[0]
        .replace(/\b(Sr|Jr|the Younger|the Elder|I{1,3})\.?$/i, '')
        .trim();
    if (/^anon/i.test(name)) {
        return '';
    }
    return fold(name);
}

// "Jahn 1925: 24; *Van der Meer 1979: 91-92" -> [{ text, key }]; key is null when no "Author Year" can be read
export function literatureRefs(literature) {
    return (literature || '')
        .split(';')
        .map(part => part.trim().replace(/\.$/, ''))
        .filter(Boolean)
        .map(part => {
            const text = clean(part);
            const match = text.match(/^([^\d:]+?\s?\d{4}[a-z]?)\b/);
            return { text, key: match ? match[1].trim() : null };
        });
}

export function enrich(record) {
    return {
        ...record,
        year: sortYear(record),
        century: century(record),
        status: status(record),
        city: city(record),
        holding: holding(record),
        search: searchText(record),
    };
}

export function chronSort(records) {
    return [...records].sort((a, b) => a.year - b.year);
}

export function citation(record, format, url, accessed = new Date()) {
    const date = clean(record.date);
    const maker = clean(record.maker);
    const type = record.type ? `${record.type.toLowerCase()} trombone` : 'trombone';
    const accessedText = accessed.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
    if (format === 'short') {
        return `Historic Trombone Database, ${date} ${maker} (${record.holding || 'location unknown'}).`;
    }
    if (format === 'bibtex') {
        return [
            `@misc{htd-${record._id},`,
            `  title = {${maker}, ${date}, ${type}},`,
            `  howpublished = {Historic Trombone Database},`,
            `  note = {${record.holding}},`,
            `  url = {${url}},`,
            `  urldate = {${accessed.toISOString().slice(0, 10)}}`,
            '}',
        ].join('\n');
    }
    return `“${maker}, ${date}. ${type.charAt(0).toUpperCase() + type.slice(1)}${record.holding ? `, ${record.holding}` : ''}.” Historic Trombone Database. ${url}. Accessed ${accessedText}.`;
}
