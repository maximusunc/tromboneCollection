// Bundles every record in content/trombones/ into client/public/data/trombones.json,
// which the React app fetches at runtime. Each record's id is its filename.
const fs = require("fs");
const path = require("path");

const contentDir = path.join(__dirname, "../content/trombones");
const outDir = path.join(__dirname, "../client/public/data");

const stringFields = [
    "maker", "date", "type", "location", "signature", "pitch", "mouthpiece",
    "dimensions", "provenance", "literature", "external_link", "remarks",
];
const listFields = ["images", "footnotes"];

const trombones = fs.readdirSync(contentDir)
    .filter(file => file.endsWith(".json"))
    .map(file => {
        const record = JSON.parse(fs.readFileSync(path.join(contentDir, file), "utf8"));
        const trombone = { ...record, _id: path.basename(file, ".json") };
        // the front end expects every field to be present
        stringFields.forEach(field => { trombone[field] = trombone[field] || ""; });
        listFields.forEach(field => { trombone[field] = (trombone[field] || []).filter(Boolean); });
        return trombone;
    });

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, "trombones.json"), JSON.stringify(trombones));
console.log(`Wrote ${trombones.length} trombones to client/public/data/trombones.json`);
