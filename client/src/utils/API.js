// trombones are bundled into a static file at build time by scripts/build-data.js
let trombonesRequest;

export default {
    // gets all trombones
    getTrombones: function() {
        if (!trombonesRequest) {
            trombonesRequest = fetch("/data/trombones.json").then(res => {
                if (!res.ok) {
                    throw new Error(`Failed to load trombones: ${res.status}`);
                }
                return res.json();
            });
            trombonesRequest.catch(() => { trombonesRequest = undefined; });
        }
        return trombonesRequest.then(data => ({ data: [...data] }));
    },
};
