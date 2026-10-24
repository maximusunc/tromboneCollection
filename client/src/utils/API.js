import axios from "axios";

// trombones are bundled into a static file at build time by scripts/build-data.js
let trombonesRequest;

export default {
    // gets all trombones
    getTrombones: function() {
        if (!trombonesRequest) {
            trombonesRequest = axios.get("/data/trombones.json");
            trombonesRequest.catch(() => { trombonesRequest = undefined; });
        }
        return trombonesRequest.then(res => ({ ...res, data: [...res.data] }));
    },
    // gets the details of a specific trombone
    getTrombone: function(id) {
        return this.getTrombones().then(res => {
            const trombone = res.data.find(tbone => tbone._id === id);
            if (!trombone) {
                throw new Error(`Trombone ${id} not found`);
            }
            return { ...res, data: trombone };
        });
    },
};
